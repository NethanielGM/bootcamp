import func from "../Exercises/2";
describe("Testing Exercise 2", () => {
  test("With false", () => {
    const mockCallback = jest.fn(() => {});
    func(false, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
  });
  test("With true", () => {
    const mockCallback = jest.fn(() => {});
    func(true, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
