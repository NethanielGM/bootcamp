import func from "../Exercises/3";
describe("Testing Exercise 3", () => {
  test("For each", (done) => {
    const collection = [1, 2, 3, 4, 5];
    func(collection, (item, index) => {
      expect(collection[index]).toBe(item);
      if (index === 4) {
        done();
      }
    });
  });
});
