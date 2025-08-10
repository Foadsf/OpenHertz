import { calculate } from '../calculator.js';

describe('Hertzian Contact Calculator', () => {
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
