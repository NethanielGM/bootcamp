/**
 * Create a promise (created here), that resolves with another promise,
 * that resolves with the string value "Nested promise value"
 */
const myPromise = new Promise((resolve, reject) => {
  resolve("Nested promise value").then((res) => res);
});

export default myPromise;
