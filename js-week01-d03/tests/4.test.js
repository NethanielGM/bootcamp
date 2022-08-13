import func from "../Exercises/4";
describe("Testing Exercise 4", () => {
  test("Map numbers", () => {
    const collection = [1, 2, 3, 4];
    const newCollection = func(collection, (item) => {
      return item + 2;
    });
    expect(newCollection).toStrictEqual([3, 4, 5, 6]);
  });
  test("Map strings", () => {
    const collection = ["1", "2", "3", "4"];
    const newCollection = func(collection, (item) => {
      return item + "1";
    });
    expect(newCollection).toStrictEqual(["11", "21", "31", "41"]);
  });
});
