import { calculate } from '../calculator.js';

describe('Hertzian Contact Calculator', () => {
  describe('Core Calculations', () => {
    it('should calculate the results for a sphere on a plane', () => {
    const state = {
      contactType: '1',
      orientation: '1',
      firstRadius: 10.0,
      secondRadius: 20.0, // Not used in this case
      cylinderLength: 30.0, // Not used in this case
      force: 1000,
      firstElastic: 200,
      secondElastic: 200,
      firstPoisson: 0.3,
      secondPoisson: 0.3,
      workOfAdhesion: 0, // No adhesion for this core test
      firstYieldStrength: 9999, // High yield strength to ensure elasticity
      secondYieldStrength: 9999,
    };
    const results = calculate(state);

    expect(results.contactRadius).toBeCloseTo(408.665, 3);
    expect(results.maximumPressure).toBeCloseTo(2858.948, 3);
    expect(results.indentation).toBeCloseTo(16.701, 3);
    expect(results.firstMises).toBeCloseTo(1772.265, 3);
  });

  it('should return zero for results when force is zero', () => {
    const state = {
      contactType: '1',
      orientation: '1',
      firstRadius: 10.0,
      secondRadius: 20.0,
      cylinderLength: 30.0,
      force: 0,
      firstElastic: 200,
      secondElastic: 200,
      firstPoisson: 0.3,
      secondPoisson: 0.3,
    };
    const results = calculate(state);
    expect(results.maximumPressure).toBe(0);
    expect(results.firstMises).toBe(0);
    expect(results.firstShear).toBe(0);
  });

  it('should calculate the results for a cylinder on a plane', () => {
    const state = {
      contactType: '3',
      orientation: '1', // Not used
      firstRadius: 15.0,
      secondRadius: 20.0, // Not used
      cylinderLength: 50.0,
      force: 2000,
      firstElastic: 210,
      secondElastic: 210,
      firstPoisson: 0.29,
      secondPoisson: 0.29,
      workOfAdhesion: 0,
      firstYieldStrength: 9999,
      secondYieldStrength: 9999,
    };
    const results = calculate(state);

    expect(results.contactWidth).toBeCloseTo(81.632, 3);
    expect(results.maximumPressure).toBeCloseTo(311.946, 3);
    expect(results.indentation).toBeCloseTo(1.355, 3);
    expect(results.firstMises).toBeCloseTo(175.019, 3);
  });

  it('should produce the same result when two spheres are swapped', () => {
    const state1 = {
      contactType: '2', // Sphere-Sphere
      orientation: '1',
      firstRadius: 10.0,
      secondRadius: 20.0,
      cylinderLength: 30.0,
      force: 1000,
      firstElastic: 200,
      secondElastic: 100,
      firstPoisson: 0.3,
      secondPoisson: 0.25,
    };
    const results1 = calculate(state1);

    const state2 = {
      contactType: '2', // Sphere-Sphere
      orientation: '1',
      firstRadius: 20.0, // Swapped
      secondRadius: 10.0, // Swapped
      cylinderLength: 30.0,
      force: 1000,
      firstElastic: 100,  // Swapped
      secondElastic: 200,  // Swapped
      firstPoisson: 0.25, // Swapped
      secondPoisson: 0.3,  // Swapped
    };
    const results2 = calculate(state2);

    // Key results that depend on combined properties should be identical
    expect(results1.effectiveRadius).toBeCloseTo(results2.effectiveRadius);
    expect(results1.effectiveElasticity).toBeCloseTo(results2.effectiveElasticity);
    expect(results1.contactRadius).toBeCloseTo(results2.contactRadius);
    expect(results1.maximumPressure).toBeCloseTo(results2.maximumPressure);
  });
  });

  describe('Adhesion Calculations', () => {
    const adhesionState = {
      contactType: '1',
      orientation: '1',
      firstRadius: 10.0,
      secondRadius: 20.0,
      cylinderLength: 30.0,
      force: 1000,
      firstElastic: 200,
      secondElastic: 200,
      firstPoisson: 0.3,
      secondPoisson: 0.3,
      workOfAdhesion: 0.5,
    };

    it('should calculate the Tabor parameter correctly', () => {
      // Manual calculation for this case:
      // E* = 109.89 GPa, R = 0.01 m, w = 0.5 J/m^2, z0 = 1.65e-10 m
      // numerator = R * w^2 = 0.01 * 0.5^2 = 0.0025
      // denominator = E*^2 * z0^3 = (109.89e9)^2 * (1.65e-10)^3 = 5.4246e-8
      // ratio = numerator / denominator = 46086.33
      // tabor = ratio^(1/3) = 35.85
      const results = calculate(adhesionState);
      expect(results.taborParameter).toBeCloseTo(35.85, 2);
    });

    it('should calculate the pull-off force correctly', () => {
      // Manual calculation for this case:
      // tabor = 35.85
      // F_po = -2 * pi * R * w * (1 + 3.04 * tabor^0.55) / (1 + 1.16 * tabor)
      // F_po = -2 * pi * 0.01 * 0.5 * (1 + 3.04 * 35.85^0.55) / (1 + 1.16 * 35.85)
      // F_po = -0.0314 * (1 + 21.82) / (1 + 41.58) = -0.0168 N
      const results = calculate(adhesionState);
      expect(results.pullOffForce).toBeCloseTo(-0.0168, 4);
    });

    it('should recommend the correct adhesion model based on Tabor parameter', () => {
      // DMT regime (e.g., stiff material, sharp tip)
      const dmtState = {
        ...adhesionState,
        firstRadius: 1e-5, // 10 nm
        firstElastic: 1000, // DLC
        secondElastic: 1000,
        firstPoisson: 0.2,
        secondPoisson: 0.2,
        workOfAdhesion: 0.1,
      };
      let results = calculate(dmtState);
      expect(results.taborParameter).toBeLessThan(0.1);
      expect(results.adhesionModel).toBe('DMT');

      // JKR regime (e.g., soft material like PDMS)
      const jkrState = {
        ...adhesionState,
        firstElastic: 0.002, // 2 MPa
        secondElastic: 0.002,
        firstPoisson: 0.5,
        secondPoisson: 0.5,
        workOfAdhesion: 0.05, // 50 mJ/m^2
      };
      results = calculate(jkrState);
      expect(results.taborParameter).toBeGreaterThan(5);
      expect(results.adhesionModel).toBe('JKR');

      // Intermediate regime (steel on steel with low w)
      const intermediateState = { ...adhesionState, workOfAdhesion: 0.0065 };
      results = calculate(intermediateState);
      expect(results.taborParameter).toBeGreaterThan(0.1);
      expect(results.taborParameter).toBeLessThan(5);
      expect(results.adhesionModel).toBe('Intermediate (Maugis-Dugdale)');
    });
  });

  describe('Plasticity Calculations', () => {
    const baseState = {
      contactType: '1',
      orientation: '1',
      firstRadius: 10.0,
      secondRadius: 20.0,
      cylinderLength: 30.0,
      firstElastic: 200,
      secondElastic: 200,
      firstPoisson: 0.3,
      secondPoisson: 0.3,
      workOfAdhesion: 0.1,
      firstYieldStrength: 400,
      secondYieldStrength: 500, // Weaker material (400 MPa) should be used
    };

    // For Sy=400MPa, critical pressure is 1.6 * 400 = 640 MPa.
    it('should identify an elastic contact when pressure is below critical', () => {
      // A force of 1N gives max pressure of ~286 MPa, which is < 640 MPa.
      const elasticState = { ...baseState, force: 1 };
      const results = calculate(elasticState);
      expect(results.contactRegime).toBe('Elastic');
    });

    it('should identify a plastic contact when pressure is above critical', () => {
      // A force of 10000N gives max pressure of ~6160 MPa, which is > 640 MPa.
      const plasticState = { ...baseState, force: 10000 };
      const results = calculate(plasticState);
      expect(results.contactRegime).toBe('Plastic');
    });

    it('should identify a plastic contact at the transition boundary', () => {
      // A force of ~12N gives max pressure of ~640 MPa.
      const boundaryState = { ...baseState, force: 12 };
      const results = calculate(boundaryState);
      expect(results.contactRegime).toBe('Plastic');
    });
  });

  describe('Input Validation', () => {
    const baseState = {
      contactType: '1',
      orientation: '1',
      firstRadius: 10.0,
      secondRadius: 20.0,
      cylinderLength: 30.0,
      force: 1000,
      firstElastic: 200,
      secondElastic: 200,
      firstPoisson: 0.3,
      secondPoisson: 0.3,
      workOfAdhesion: 0.1,
      firstYieldStrength: 400,
      secondYieldStrength: 500,
    };

    it('should return NaN for results when force is negative', () => {
      const state = { ...baseState, force: -100 };
      const results = calculate(state);
      expect(results.contactRadius).toBeNaN();
      expect(results.maximumPressure).toBeNaN();
    });

    it('should return NaN for results when radius is negative for sphere-plane', () => {
      const state = { ...baseState, contactType: '1', firstRadius: -10 };
      const results = calculate(state);
      expect(results.contactRadius).toBeNaN();
    });

    // Note: Negative radius is allowed for sphere-sphere (sphere in cup)
    // and cylinder-cylinder, so we don't test for that here.

    it('should return NaN for results when Poisson\'s ratio is invalid', () => {
      const state = { ...baseState, firstPoisson: 0.6 };
      const results = calculate(state);
      // Effective elasticity should be NaN or Infinity if Poisson's ratio is invalid
      // which will propagate to other calculations.
      expect(results.effectiveElasticity).toBeNaN();
    });
  });
});
