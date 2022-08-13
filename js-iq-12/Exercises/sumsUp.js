/*
Create a function that gets every pair of numbers from an array that sums 
up to eight and returns it as an array of pairs (pair sorted ascendingly) 
collated into an object. See the following examples for more details.

Examples
sumsUp([1, 2, 3, 4, 5]) ➞ {"pairs": [[3, 5]]}

sumsUp([10, 9, 7, 2, 8]) ➞ {"pairs": []}

The pairs should be ordered "First pair found, first placed".

sumsUp([1, 6, 5, 4, 8, 2, 3, 7]) ➞ {"pairs": [[1, 7], [2, 6], [3, 5]]}
// [1, 7] first to complete the cycle (to sum up to 8)
// [6, 2] Second pair
// [5, 3] follows

Don't forget to sort them before placing them in the answer:
[6, 2] => Should be [2,6]
[5, 3] => Should be [3,5]

Solution: {"pairs": [[1, 7], [2, 6], [3, 5]]}
Notes
Remember the idea of "completes the cycle first" when getting the sort order of pairs.
Only unique numbers are present in the array.
*/

function sumsUp(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] + arr[j] == 8) {
        if (arr[j] <= 3) {
          res.push([arr[i], arr[j]].reverse());
        } else {
          res.push([arr[i], arr[j]]);
        }
      }
  }
  return res;
}
exports.solution = sumsUp;
