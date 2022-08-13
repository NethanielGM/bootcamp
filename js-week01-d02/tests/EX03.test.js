const module = require("../D02/EX03");
const path = require("path");
const fileName = path.basename(__filename).split(".")[0];

describe(`Testing ${fileName}: calculateMatrixColumnSum`, () => {
  it.each`
    input                                                        | column | expectedResult
    ${[
  [2, 6, 11, 4, 13, 5],
  [5, 12, 1, 8, 32, 4],
  [10, 2, 3, 9, 1, 3],
  [6, 6, 1, 3, 13, 9],
]} | ${2} | ${16}
    ${[[2, 6, 11, 4, 13, 5], [0, -9, 1, 3], [6, 6, 1, 34], [5, 0]]} | ${1}   | ${3}
    ${[[-1], [-12], [7], [4]]}                                   | ${0}   | ${-2}
  `(
    `The sum of $input in column $column should be $expectedResult`,
    ({ input, column, expectedResult }) => {
      expect(module.calculateMatrixColumnSum(input, column)).toBe(
        expectedResult
      ); // for the return statement
    }
  );
});
