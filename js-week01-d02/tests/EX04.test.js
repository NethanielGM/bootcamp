const path = require("path");
const fileName = path.basename(__filename).split(".")[0];
const module = require(`../D02/${fileName}`);

describe(`Testing ${fileName}: calculateMatrixDiagonalSum`, () => {
  it.each`
    input | expectedResult
    ${[
  [2, 6, 11, 4, 13, 5],
  [5, 12, 1, 8, 32, 4],
  [10, 2, 3, 9, 1, 3],
  [6, 6, 1, 3, 13, 9],
]} | ${20}
    ${[
  [-1, 4, 5],
  [1234, 2, -12],
  [34, 5, 7],
]} | ${8}
    ${[
  [-1, 4, 5],
  [1234, 2, -12],
  [34, 5],
]} | ${NaN}
  `(
    `The sum of $input should be $expectedResult`,
    ({ input, expectedResult }) => {
      expect(module.calculateMatrixDiagonalSum(input)).toBe(expectedResult); // for the return statement
    }
  );
});
