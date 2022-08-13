function calculateMatrixDiagonalSum(matrix) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (i === j) {
        if (typeof matrix[i][j] === "undefined") {
          return NaN;
        }
        sum += matrix[i][j];
      }
    }
  }
  console.log(sum);
  return sum;
}

// Do not remove or change this line, or the tests won't work
export { calculateMatrixDiagonalSum };
