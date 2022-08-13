function sumNumbersWhileLoop(array) {
  let i = 0;
  let sum = 0;
  while (i < array.length) {
    sum += array[i];
    i++;
  }
  console.log(sum);
  return sum;
}

function sumNumbersForLoop(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  console.log(sum);
  return sum;
}

// Do not remove or change this line, or the tests won't work
export { sumNumbersWhileLoop, sumNumbersForLoop };
