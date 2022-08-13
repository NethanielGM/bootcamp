import func from "../Exercises/1";
describe("Testing Exercise 1", () => {
  test("Sum 1 & 2", (done) => {
    func(1, 2, (sum) => {
      expect(sum).toBe(3);
      done();
    });
  });
  test("Sums -1 & 2", (done) => {
    func(-1, 2, (sum) => {
      expect(sum).toBe(1);
      done();
    });
  });
  test("Sums 1.5 & -2", (done) => {
    func(1.5, -2, (sum) => {
      expect(sum).toBe(-0.5);
      done();
    });
  });
});
