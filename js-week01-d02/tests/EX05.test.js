const path = require("path");
const fileName = path.basename(__filename).split(".")[0];
const module = require(`../D02/${fileName}`);

describe(`Testing ${fileName}: calculateSumRecursion`, () => {
  it.each`
    input | expectedResult
    ${[1, 2, 3, 4, 5, 6]} | ${21}
    ${[2, 6, 11, 4, 13, 5]} | ${41}
    ${[]} | ${0}
    ${['a', 'b', 'c']} | ${'abc'}
  `(
    `The sum of $input should be $expectedResult`,
    ({ input, expectedResult }) => {
      expect(module.calculateSumRecursion(input)).toBe(expectedResult); // for the return statement
    }
  );
});
