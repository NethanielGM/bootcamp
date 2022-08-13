function getRandomInt(max) {
  const randomNum = Math.floor(Math.random() * max) + 1;
  return randomNum;
}
const maxNumber = 100;

function moduloEx7(max) {
  const number = getRandomInt(max);
  const comparer = getRandomInt(max);
  let result;

  if (number > comparer) {
    if (number % comparer !== 0) {
      result = number % comparer;
    }
    document.getElementById("demo").innerHTML = result;
  }
}
moduloEx7(maxNumber);
