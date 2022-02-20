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
  return (firstCoordinate < 0 || firstCoordinate >= secondCoordinate) ? 'Одно из чисел отрицательное, либо первое значение больше или равно второму.' : +((Math.random() * (secondCoordinate - firstCoordinate)) + firstCoordinate).toFixed(decimal);
}

getRandomCoordinate(1.1,1.2,4);
