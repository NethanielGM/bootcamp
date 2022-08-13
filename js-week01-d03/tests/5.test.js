import curry from "../Exercises/5";
describe("Testing Exercise 5", () => {
  let fc;
  beforeAll(() => {
    fc = a => a + 5;
  });

  test("Currying", () => {
    const curried = curry(5, fc);
    const secondCall = curried();
    expect(secondCall).toStrictEqual(10);
  });
  
  test("Currying 2", () => {
    const curried = curry(15, fc);
    const secondCall = curried();
    expect(secondCall).toStrictEqual(20);
  });
});
