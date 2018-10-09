export const coinFlip = () => {
  return Math.floor(Math.random() * 2) === 0;
};

export const random = (min, max) => {
  return Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
};
