/*
Write a function that returns true if a string consists of ascending or ascending AND consecutive numbers.

Examples
ascending("232425") ➞ true
// Consecutive numbers 23, 24, 25

ascending("2324256") ➞ false
// No matter how this string is divided, the numbers are not consecutive.

ascending("444445") ➞ true
// Consecutive numbers 444 and 445.
Notes
A number can consist of any number of digits, so long as the numbers are adjacent to each other, and the string has at least two of them.
*/

function ascending(str) {
  let start;
  let length = str.length;
  for (let i = 0; i < length / 2; i++) {
    let new_str = str.substring(0, i + 1);
    let num = +new_str;
    start = num;
    while (new_str.length < length) {
      num++;
      new_str = new_str + (num).toString();
    }
    if (new_str == (str))
      return true;
  }
  return false;
}

exports.solution = ascending;