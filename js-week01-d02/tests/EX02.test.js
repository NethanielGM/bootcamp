const module = require("../D02/EX02");
const path = require("path");
const fileName = path.basename(__filename).split(".")[0];

describe(`Testing ${fileName}: calculateMatrixSum`, () => {
  it.each`
    input                                                        | expectedResult
    ${[
  [2, 6, 11, 4, 13, 5],
  [5, 12, 1, 8, 32, 4],
  [10, 2, 3, 9, 1, 3],
  [6, 6, 1, 3, 13, 9],
]} | ${169}
    ${[[2, 6, 11, 4, 13, 5], [0, -9, 1, 3], [6, 6, 1, 34], [5]]} | ${88}
    ${[[-1], [-12], [7], [4]]}                                   | ${-2}
  `(
    `The sum of $input should be $expectedResult`,
    ({ input, expectedResult }) => {
      expect(module.calculateMatrixSum(input)).toBe(expectedResult); // for the return statement
    }
  );
});
