/**
 * Create a function that receives two parameters.
 * The first one should be a placeholder for a memoized value.
 * The second one would be a callback funciton.
 * On the first call of curry, you should return a function that returns the callback function
 * on the second call, you should run the returned function.
 * });
 * @param {number} number
 * @param {Function} callback
 */
function curry(number, callback) {
  function curried() {
    return callback(number);
  }
  return curried;
}

export default curry;
