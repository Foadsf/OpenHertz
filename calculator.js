export function calculate(s) {
    if (s.force === 0) {
        return {
            effectiveRadius: 0, effectiveElasticity: 0,
            contactRadius: 0, contactWidth: 0, indentation: 0, maximumPressure: 0,
            firstMises: 0, secondMises: 0,
            firstMisesDepth: 0, secondMisesDepth: 0,
            firstShear: 0, secondShear: 0,
            firstShearDepth: 0, secondShearDepth: 0,
            pullOffForce: 0, taborParameter: 0, adhesionModel: 'N/A',
            contactRegime: 'N/A',
        };
    }
    const isPointContact = s.contactType === '1' || s.contactType === '2' || (s.contactType === '4' && s.orientation === '1' && s.firstRadius === s.secondRadius);
    const isLineContact = s.contactType === '3' || (s.contactType === '4' && s.orientation === '2');

    let effectiveRadius;
    if (s.contactType === '1' || s.contactType === '3') {
      effectiveRadius = s.firstRadius;
    } else {
      effectiveRadius = (s.firstRadius * s.secondRadius) / (s.firstRadius + s.secondRadius);
    }

    const effectiveElasticity = (s.firstElastic * s.secondElastic) /
      (s.secondElastic * (1 - s.firstPoisson ** 2) + s.firstElastic * (1 - s.secondPoisson ** 2));

    let contactRadius = NaN;
    if (isPointContact) {
      contactRadius = Math.pow(3 * s.force * effectiveRadius / 1E3 / 4 / effectiveElasticity / 1E9, (1 / 3)) * 1E6;
    }

    let contactWidth = NaN;
    if (isLineContact) {
        contactWidth = 2 * Math.sqrt(s.force * effectiveRadius / 1E3 / Math.PI / s.cylinderLength * 1E3 / effectiveElasticity / 1E9) * 1E6;
    }

    let indentation = NaN;
    if (isLineContact) {
      indentation = s.force / Math.PI / effectiveElasticity / 1E9 / s.cylinderLength * 1E3 * (Math.log(4 * Math.PI * effectiveElasticity * 1E9 * effectiveRadius / 1E3 * s.cylinderLength / 1E3 / s.force) - 1) * 1E6;
    } else if (isPointContact) {
      indentation = Math.pow(contactRadius, 2) / effectiveRadius / 1E3;
    }

    let maximumPressure = NaN;
    if (isLineContact) {
      maximumPressure = 2 * s.force / Math.PI / s.cylinderLength * 1E3 / contactWidth * 1E6 / 1E6;
    } else if (isPointContact) {
      maximumPressure = 3 * s.force / 2 / Math.PI / Math.pow(contactRadius / 1E6, 2) / 1E6;
    }

    const calcMisesCo = (poisson) => {
      if (isLineContact) {
        if (poisson < 0.1938) return 1 / Math.sqrt(1 + 4 * (poisson - 1) * poisson);
        return 1.164 + 2.975 * poisson - 2.906 * Math.pow(poisson, 2);
      }
      if (isPointContact) {
        return 1.30075 + 0.87825 * poisson + 0.54373 * Math.pow(poisson, 2);
      }
      return NaN;
    };

    const calcMisesDepthFactor = (poisson) => {
      if (isLineContact) {
        if (poisson < 0.1938) return 0;
        return 0.223 + 2.321 * poisson - 2.397 * Math.pow(poisson, 2);
      }
      if (isPointContact) {
        return 0.38167 + 0.33136 * poisson;
      }
      return NaN;
    };

    const calcShearCo = (poisson) => {
      if (isLineContact) {
        if (poisson < 0.2415) return 0.4767 * Math.pow(poisson, 2) - 0.9302 * poisson + 0.4976;
        return 0.3003;
      }
      if (isPointContact) {
        return 1 / (2.6013 + 1.7585 * poisson + 1.0842 * Math.pow(poisson, 2));
      }
      return NaN;
    };

    const calcShearDepthFactor = (poisson) => {
      if (isLineContact) {
        if (poisson < 0.2415) return 2.2694 * Math.pow(poisson, 3) - 1.6849 * Math.pow(poisson, 2) + 1.8433 * poisson + 2.8898e-03;
        return 0.7861;
      }
      if (isPointContact) {
        return 0.38167 + 0.33136 * poisson;
      }
      return NaN;
    };

    const firstMises = maximumPressure / calcMisesCo(s.firstPoisson);
    const secondMises = maximumPressure / calcMisesCo(s.secondPoisson);
    const firstShear = maximumPressure * calcShearCo(s.firstPoisson);
    const secondShear = maximumPressure * calcShearCo(s.secondPoisson);

    let firstMisesDepth = NaN, secondMisesDepth = NaN, firstShearDepth = NaN, secondShearDepth = NaN;
    if (isLineContact) {
        const dim = contactWidth;
        firstMisesDepth = dim * calcMisesDepthFactor(s.firstPoisson);
        secondMisesDepth = dim * calcMisesDepthFactor(s.secondPoisson);
        firstShearDepth = dim * calcShearDepthFactor(s.firstPoisson);
        secondShearDepth = dim * calcShearDepthFactor(s.secondPoisson);
    } else if (isPointContact) {
        const dim = contactRadius;
        firstMisesDepth = dim * calcMisesDepthFactor(s.firstPoisson);
        secondMisesDepth = dim * calcMisesDepthFactor(s.secondPoisson);
        firstShearDepth = dim * calcShearDepthFactor(s.firstPoisson);
        secondShearDepth = dim * calcShearDepthFactor(s.secondPoisson);
    }

    // --- Adhesion Logic ---
    const z0 = 1.65e-10; // Equilibrium separation distance in meters
    const R_m = effectiveRadius / 1000; // Effective radius in meters
    const E_star_Pa = effectiveElasticity * 1e9; // Effective elasticity in Pascals

    const taborParameter = Math.pow((R_m * s.workOfAdhesion**2) / (E_star_Pa**2 * z0**3), 1/3);

    let pullOffForce = NaN;
    let adhesionModel = 'N/A';

    if (isPointContact) {
        // Using Carpick-Ogletree-Salmeron approximation
        pullOffForce = -2 * Math.PI * R_m * s.workOfAdhesion * (1 + 3.04 * taborParameter**0.55) / (1 + 1.16 * taborParameter);

        if (taborParameter < 0.1) {
            adhesionModel = 'DMT';
        } else if (taborParameter > 5) {
            adhesionModel = 'JKR';
        } else {
            adhesionModel = 'Intermediate (Maugis-Dugdale)';
        }
    }

    // --- Plasticity Logic ---
    let contactRegime = 'N/A';
    if (isPointContact) {
        const yieldStrength = Math.min(s.firstYieldStrength, s.secondYieldStrength);
        const p_critical = 1.6 * yieldStrength;
        if (maximumPressure < p_critical) {
            contactRegime = 'Elastic';
        } else {
            contactRegime = 'Plastic';
        }
    }


    return {
      effectiveRadius, effectiveElasticity,
      contactRadius, contactWidth, indentation, maximumPressure,
      firstMises, secondMises,
      firstMisesDepth, secondMisesDepth,
      firstShear, secondShear,
      firstShearDepth, secondShearDepth,
      pullOffForce, taborParameter, adhesionModel,
      contactRegime,
    };
}
