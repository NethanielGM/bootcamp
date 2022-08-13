import func from "../Exercises/5";
describe("Testing Exercise 5", () => {
  test("Should resolve", (done) => {
    const array = ["a", "b", "c", "d", "e"];
    func(array).then((newArray) => {
      expect(newArray).toStrictEqual(array.map((w) => w.toUpperCase()));
      done();
    });
  });
  test("Should reject", (done) => {
    const array = ["a", "b", 1, "d", "e"];
    func(array)
      .then()
      .catch((errorMessage) => {
        expect(errorMessage).toBe(
          "All items in the array should be of type string"
        );
        done();
      });
  });
});
