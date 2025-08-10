const app = {
  state: {
    contactType: '1',
    orientation: '1',
    firstRadius: 10.0,
    secondRadius: 20.0,
    cylinderLength: 30.0,
    force: 20.0,
    firstElastic: 200,
    secondElastic: 200,
    firstPoisson: 0.3,
    secondPoisson: 0.3,
  },
  elements: {},
  init() {
    // Cache DOM elements
    this.elements.contactTypeList = document.getElementById('contactTypeList');
    this.elements.orientationSelector = document.getElementById('OrientationSelector');
    this.elements.firstRadius = document.getElementById('firstRadius');
    this.elements.secondRadiusValue = document.getElementById('secondRadiusValue');
    this.elements.cylinderLengthValue = document.getElementById('cylinderLengthValue');
    this.elements.forceValue = document.getElementById('forceValue');
    this.elements.firstElastic = document.getElementById('firstElastic');
    this.elements.secondElastic = document.getElementById('secondElastic');
    this.elements.firstPoisson = document.getElementById('firstPoisson');
    this.elements.secondPoisson = document.getElementById('secondPoisson');

    this.elements.orientationList = document.getElementById('orientationList');
    this.elements.contactTypeImg = document.getElementById('contactType');
    this.elements.secondRadiusP = document.getElementById('secondRadius');
    this.elements.effectiveRadiusTr = document.getElementById('effectiveRadius');
    this.elements.cylinderLengthP = document.getElementById('cylinderLength');
    this.elements.pointContactTr = document.getElementById('pointContact');
    this.elements.lineContactTr = document.getElementById('lineContact');
    this.elements.indentationPicture = document.getElementById('indentationPicture');
    this.elements.maxPressurePicture = document.getElementById('maxPressurePicture');

    this.elements.effectiveRadiusValue = document.getElementById('effectiveRadiusValue');
    this.elements.effectiveElasticityValue = document.getElementById('effectiveElasticityValue');
    this.elements.contactRadius = document.getElementById('contactRadius');
    this.elements.contactWidth = document.getElementById('contactWidth');
    this.elements.indentation = document.getElementById('indentation');
    this.elements.maximumPressure = document.getElementById('maximumPressure');
    this.elements.firstMises = document.getElementById('firstMises');
    this.elements.secondMises = document.getElementById('secondMises');
    this.elements.firstMisesDepth = document.getElementById('firstMisesDepth');
    this.elements.secondMisesDepth = document.getElementById('secondMisesDepth');
    this.elements.firstShear = document.getElementById('firstShear');
    this.elements.secondShear = document.getElementById('secondShear');
    this.elements.firstShearDepth = document.getElementById('firstShearDepth');
    this.elements.secondShearDepth = document.getElementById('secondShearDepth');

    // Add event listeners
    const inputs = [
      this.elements.contactTypeList, this.elements.orientationSelector,
      this.elements.firstRadius, this.elements.secondRadiusValue,
      this.elements.cylinderLengthValue, this.elements.forceValue,
      this.elements.firstElastic, this.elements.secondElastic,
      this.elements.firstPoisson, this.elements.secondPoisson
    ];
    inputs.forEach(input => {
        if(input) {
            input.addEventListener('change', () => this.update());
        }
    });

    // Initial update
    this.update();
  },
  readInputs() {
    this.state.contactType = this.elements.contactTypeList.value;
    this.state.orientation = this.elements.orientationSelector.value;
    this.state.firstRadius = parseFloat(this.elements.firstRadius.value);
    this.state.secondRadius = parseFloat(this.elements.secondRadiusValue.value);
    this.state.cylinderLength = parseFloat(this.elements.cylinderLengthValue.value);
    this.state.force = parseFloat(this.elements.forceValue.value);
    this.state.firstElastic = parseFloat(this.elements.firstElastic.value);
    this.state.secondElastic = parseFloat(this.elements.secondElastic.value);
    this.state.firstPoisson = parseFloat(this.elements.firstPoisson.value);
    this.state.secondPoisson = parseFloat(this.elements.secondPoisson.value);
  },
  updateUI() {
    const { contactType, orientation } = this.state;
    const isCylinderCylinder = contactType === '4';

    this.elements.orientationList.style.display = isCylinderCylinder ? 'block' : 'none';

    if (isCylinderCylinder) {
      this.elements.secondRadiusP.style.display = 'block';
      this.elements.effectiveRadiusTr.style.display = 'table-row';
      if (orientation === '1') { // Perpendicular
        this.elements.contactTypeImg.src = 'pics/CylinderCylinderPerpendicular.PNG';
        this.elements.cylinderLengthP.style.display = 'none';
        this.elements.pointContactTr.style.display = 'table-row';
        this.elements.lineContactTr.style.display = 'none';
        this.elements.indentationPicture.src = 'pics/indentationSphere.svg';
        this.elements.maxPressurePicture.src = 'pics/maxPressureSphere.svg';
      } else { // Parallel
        this.elements.contactTypeImg.src = 'pics/CylinderCylinderParallel.PNG';
        this.elements.cylinderLengthP.style.display = 'block';
        this.elements.pointContactTr.style.display = 'none';
        this.elements.lineContactTr.style.display = 'table-row';
        this.elements.indentationPicture.src = 'pics/indentationLine.svg';
        this.elements.maxPressurePicture.src = 'pics/maxPressureLine.svg';
      }
    } else {
      switch (contactType) {
        case '1': // Sphere - Plane
          this.elements.contactTypeImg.src = 'pics/SpherePlane.PNG';
          this.elements.secondRadiusP.style.display = 'none';
          this.elements.effectiveRadiusTr.style.display = 'none';
          this.elements.cylinderLengthP.style.display = 'none';
          this.elements.pointContactTr.style.display = 'table-row';
          this.elements.lineContactTr.style.display = 'none';
          this.elements.indentationPicture.src = 'pics/indentationSphere.svg';
          this.elements.maxPressurePicture.src = 'pics/maxPressureSphere.svg';
          break;
        case '2': // Sphere - Sphere
          this.elements.contactTypeImg.src = 'pics/SphereSphere.PNG';
          this.elements.secondRadiusP.style.display = 'block';
          this.elements.effectiveRadiusTr.style.display = 'table-row';
          this.elements.cylinderLengthP.style.display = 'none';
          this.elements.pointContactTr.style.display = 'table-row';
          this.elements.lineContactTr.style.display = 'none';
          this.elements.indentationPicture.src = 'pics/indentationSphere.svg';
          this.elements.maxPressurePicture.src = 'pics/maxPressureSphere.svg';
          break;
        case '3': // Cylinder - Plane
          this.elements.contactTypeImg.src = 'pics/CylinderPlane.PNG';
          this.elements.secondRadiusP.style.display = 'none';
          this.elements.effectiveRadiusTr.style.display = 'none';
          this.elements.cylinderLengthP.style.display = 'block';
          this.elements.pointContactTr.style.display = 'none';
          this.elements.lineContactTr.style.display = 'table-row';
          this.elements.indentationPicture.src = 'pics/indentationLine.svg';
          this.elements.maxPressurePicture.src = 'pics/maxPressureLine.svg';
          break;
        case '5': // Elliptical
          this.elements.contactTypeImg.src = 'pics/Elliptical.PNG';
          break;
      }
    }
  },
  calculate() {
    const s = this.state;

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

    return {
      effectiveRadius, effectiveElasticity,
      contactRadius, contactWidth, indentation, maximumPressure,
      firstMises, secondMises,
      firstMisesDepth, secondMisesDepth,
      firstShear, secondShear,
      firstShearDepth, secondShearDepth,
    };
  },
  displayResults(results) {
    const toFixed = (val, places) => (val && isFinite(val)) ? val.toFixed(places) : 'N/A';

    this.elements.effectiveRadiusValue.innerHTML = toFixed(results.effectiveRadius, 2);
    this.elements.effectiveElasticityValue.innerHTML = toFixed(results.effectiveElasticity, 2);
    this.elements.contactRadius.innerHTML = toFixed(results.contactRadius, 3);
    this.elements.contactWidth.innerHTML = toFixed(results.contactWidth, 3);
    this.elements.indentation.innerHTML = toFixed(results.indentation, 3);
    this.elements.maximumPressure.innerHTML = toFixed(results.maximumPressure, 2);
    this.elements.firstMises.innerHTML = toFixed(results.firstMises, 2);
    this.elements.secondMises.innerHTML = toFixed(results.secondMises, 2);
    this.elements.firstMisesDepth.innerHTML = toFixed(results.firstMisesDepth, 3);
    this.elements.secondMisesDepth.innerHTML = toFixed(results.secondMisesDepth, 3);
    this.elements.firstShear.innerHTML = toFixed(results.firstShear, 2);
    this.elements.secondShear.innerHTML = toFixed(results.secondShear, 2);
    this.elements.firstShearDepth.innerHTML = toFixed(results.firstShearDepth, 3);
    this.elements.secondShearDepth.innerHTML = toFixed(results.secondShearDepth, 3);
  },
  update() {
    this.readInputs();
    this.updateUI();
    const results = this.calculate();
    this.displayResults(results);
  },
};

window.addEventListener('load', () => app.init());