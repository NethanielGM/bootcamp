/*
Create a function that takes two numbers as arguments (num, length) and returns an array of multiples of num up to length.

Examples
arrayOfMultiples(7, 5) ➞ [7, 14, 21, 28, 35]

arrayOfMultiples(12, 10) ➞ [12, 24, 36, 48, 60, 72, 84, 96, 108, 120]

arrayOfMultiples(17, 6) ➞ [17, 34, 51, 68, 85, 102]
Notes
Notice that num is also included in the returned array.
*/

function arrayOfMultiples(a, b) {
  let arr = [];
  for (let i = 1; i <= b; i++) {
    arr.push(a * i);
  }
  return arr;
}
// const newArr = new Array(b).fill(a);
// const newArr1 = new Array();
// let i = 1;
// newArr.forEach((element) => {
//   newArr1.push(element * i);
//   i++;
// });
// return newArr1;
// }
exports.solution = arrayOfMultiples;
