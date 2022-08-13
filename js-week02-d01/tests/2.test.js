import myPromise from "../Exercises/2";
describe("Testing Exercise 2", () => {
  test("resolve after 1.5 seconds", (done) => {
    const mockCallback = jest.fn(() => {});
    myPromise.then(mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(0);
    });
    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
      done();
    }, 2000);
  });
});
