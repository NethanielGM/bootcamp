const module = require("../D02/EX01");
const path = require("path");
const fileName = path.basename(__filename).split(".")[0];

describe(`Testing ${fileName}: sumNumbersForLoop`, () => {
  it.each`
    input              | expectedResult
    ${[1, 2, 3, 4]}    | ${10}
    ${[-1, -12, 7, 4]} | ${-2}
    ${[5]}             | ${5}
    ${[0]}             | ${0}
  `(
    "The sum of $input should be $expectedResult",
    ({ input, expectedResult }) => {
      global.console = {
        log: jest.fn(),
      };
      expect(module.sumNumbersForLoop(input)).toBe(expectedResult); // for the return statement
      expect(global.console.log).toHaveBeenCalledWith(expectedResult);
    }
  );
});

describe(`Testing ${fileName}: sumNumbersWhileLoop`, () => {
  it.each`
    input              | expectedResult
    ${[1, 2, 3, 4]}    | ${10}
    ${[-1, -12, 7, 4]} | ${-2}
    ${[5]}             | ${5}
    ${[0]}             | ${0}
  `(
    "The sum of $input should be $expectedResult",
    ({ input, expectedResult }) => {
      global.console = {
        log: jest.fn(),
      };
      expect(module.sumNumbersWhileLoop(input)).toBe(expectedResult); // for the return statement
      expect(global.console.log).toHaveBeenCalledWith(expectedResult);
    }
  );
});
