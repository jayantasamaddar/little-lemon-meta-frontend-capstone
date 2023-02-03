import { validateNumber } from '../validation-helpers';

describe('Perform Tests on Validation Helpers', () => {
  it('validateNumber', () => {
    const regex = new RegExp(/^[+-]?[0-9]+(\.[0-9]+)?$/);

    // Validate Numbers
    const min = 1;
    const max = 12;
    const inputs = [0, 1, 11, 12, 13, 100, 10000, ['A', 'B'], 'ab', { a: 'b' }];

    for (const input of inputs) {
      const output = regex.test(input) ? input >= min && input <= max : false;
      const result = validateNumber(input, min, max);
      expect(result).toBe(output);
    }

    // Validate Floats
    const min2 = 0.95;
    const max2 = 5.75;
    const inputs2 = [0.25, 0.94, 0.95, 1.87, 5.74, 5.75, 100];

    for (const input of inputs2) {
      const output = regex.test(input) ? input >= min2 && input <= max2 : false;
      const result = validateNumber(input, min2, max2);
      expect(result).toBe(output);
    }
  });
});
