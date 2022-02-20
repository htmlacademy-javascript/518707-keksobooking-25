function getRandomNumber(firstNumber, secondNumber) {
  if (firstNumber < 0 || firstNumber >= secondNumber) {
    return 'Одно из чисел отрицательное, либо первое значение больше или равно второму.';
  }

  firstNumber = Math.ceil(firstNumber);
  secondNumber = Math.floor(secondNumber);

  return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
}

getRandomNumber(4,8);

function getRandomCoordinate(firstCoordinate, secondCoordinate, decimal) {
  if (firstCoordinate < 0 || firstCoordinate >= secondCoordinate) {
    return 'Одно из чисел отрицательное, либо первое значение больше или равно второму.';
  }

  const randomCoordinate = (Math.random() * (secondCoordinate - firstCoordinate)) + firstCoordinate;
  return +randomCoordinate.toFixed(decimal);
}

getRandomCoordinate(1.1,1.2,4);
