import myPromise from "../Exercises/3";
describe("Testing Exercise 3", () => {
  test("resolve two promises", (done) => {
    myPromise
      .then((nestedPromise) => nestedPromise)
      .then((value) => {
        expect(value).toBe("Nested promise value");
        done();
      });
  });
});
