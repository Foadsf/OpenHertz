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
    };
    const results = calculate(state);
    expect(results).toMatchSnapshot();
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
    };
    const results = calculate(state);
    expect(results).toMatchSnapshot();
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
      const results = calculate(adhesionState);
      expect(results.taborParameter).toBeCloseTo(35.85, 2);
    });

    it('should calculate the pull-off force correctly', () => {
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
      secondYieldStrength: 500, // Weaker material should be used
    };

    it('should identify an elastic contact', () => {
      const elasticState = { ...baseState, force: 1 }; // Very low force
      const results = calculate(elasticState);
      expect(results.contactRegime).toBe('Elastic');
    });

    it('should identify a plastic contact', () => {
      const plasticState = { ...baseState, force: 10000 }; // High force
      const results = calculate(plasticState);
      expect(results.contactRegime).toBe('Plastic');
    });
  });
});
