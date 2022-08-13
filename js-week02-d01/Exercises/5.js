/**
 * In the function, you receive and array
 * You should return a promise that resolves with a new array that contains
 * the strings from the previous array but capitalized
 * If there is an item in the array which is not a string, the promise should reject
 * with the string "All items in the array should be of type string"
 * @param {string[]} arrayOfStrings
 */
function makeAllCapsAsync(arrayOfStrings) {
  const index0fNonString = arrayOfStrings.findIndex(
    (elem) => typeof elem !== "string"
  );
  const promise = new Promise((resolve, reject) => {
    if (index0fNonString >= 0) {
      reject("All items in the array should be of type string");
    } else {
      resolve(arrayOfStrings.map((data) => data.toUpperCase()));
    }
  });
  return promise;
}

export default makeAllCapsAsync;
