export const validateNumber = (input, min = 0, max = 10) => {
  const regex = new RegExp(/^[+-]?[0-9]+(\.[0-9]+)?$/);

  if (regex.test(input)) {
    const n = input % 1 ? parseFloat(input) : parseInt(input);
    return n >= min && n <= max;
  }
  return false;
};
