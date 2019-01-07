export const createArray = amount =>
  Array.apply(null, Array(amount)).map((el, key) => key);
