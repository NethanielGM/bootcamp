function calculateMatrixColumnSum(matrix, col) {
  let column = [];
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    column.push(matrix[i][col]);
  }
  for (let i = 0; i < column.length; i++) {
    sum += column[i];
  }
  console.log(sum);
  return sum;
}

// Do not remove or change this line, or the tests won't work
export { calculateMatrixColumnSum };
