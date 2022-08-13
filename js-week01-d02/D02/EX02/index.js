function calculateMatrixSum(matrix) {
  let sum = 0;
  for (let i of matrix) {
    for (let j of i) {
      sum += j;
    }
  }
  console.log(sum);
  return sum;
}

// Do not remove or change this line, or the tests won't work
export { calculateMatrixSum };
