/*
Create a function that takes an array of strings representing times ('hours:minutes:seconds') and returns their sum as an array of integers ([hours, minutes, seconds]).

Examples
timeSum(["1:23:45"]) ➞ [1, 23, 45]

timeSum(["1:03:45", "1:23:05"]) ➞ [2, 26, 50]

timeSum(["5:39:42", "10:02:08", "8:26:33"]) ➞ [24, 8, 23]
Notes
If the input is an empty array, return [0, 0, 0].
*/

function timeSum(arr) {
  const sumArr = [0, 0, 0];

  arr.forEach((element, i) => {
    let match = element.match(/^[0-5]?\d|[0-5]\d|[0-5]\d$/g); // or let match = element.split(':');
    console.log(match);
    for (let i = 0; i < match.length; i++) {
      sumArr[i] += Number(match[i]);
    }
  });
  const convertedArr = [
    sumArr[0] + Math.floor(sumArr[1] / 60),
    (sumArr[1] % 60) + Math.floor(sumArr[2] / 60),
    sumArr[2] % 60,
  ];
  return convertedArr; // O(N^2)
}
exports.solution = timeSum;
