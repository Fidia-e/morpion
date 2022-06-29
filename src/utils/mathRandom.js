const MathRandom = (max) => {
  return Math.floor(Math.random() * max);
};

// const MathRandom = (min = 0, max) => {
//   return Math.floor(Math.random() * (max - min + 1) ) + min;
// };

export default MathRandom;
