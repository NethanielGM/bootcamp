import myPromise from "../Exercises/1";
describe("Testing Exercise 1", () => {
  test("Hello World", (done) => {
    myPromise.then((value) => {
      expect(value).toBe("Hello World");
      done();
    });
  });
});
