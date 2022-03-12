const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const getChangedArray = (array) => {
  const copy = array.slice();
  const newArray = [];

  for (let i = getRandomPositiveInteger(1, copy.length); i > 0; i--) {
    newArray.push(copy.splice(getRandomPositiveInteger(0, copy.length - 1), 1)[0]);
  }

  return newArray;
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getChangedArray};
