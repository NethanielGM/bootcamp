import func from "../Exercises/4";
describe("Testing Exercise 4", () => {
  test("Should resolve", (done) => {
    const mockResolveCallback = jest.fn(() => {});
    const mockRejectCallback = jest.fn(() => {});
    func(true).then(mockResolveCallback).catch(mockRejectCallback);
    setTimeout(() => {
      expect(mockResolveCallback.mock.calls.length).toBe(1);
      expect(mockRejectCallback.mock.calls.length).toBe(0);
      done();
    }, 0);
  });
  test("Should reject", (done) => {
    const mockResolveCallback = jest.fn(() => {});
    const mockRejectCallback = jest.fn(() => {});
    func(false).then(mockResolveCallback).catch(mockRejectCallback);
    setTimeout(() => {
      expect(mockResolveCallback.mock.calls.length).toBe(0);
      expect(mockRejectCallback.mock.calls.length).toBe(1);
      done();
    }, 0);
  });
});
