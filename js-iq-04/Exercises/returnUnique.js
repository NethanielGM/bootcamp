/*
In each input array, every number repeats at least once, except for two. Write a function that returns the two unique numbers.
Examples
returnUnique([1, 9, 8, 8, 7, 6, 1, 6]) ➞ [9, 7]

returnUnique([5, 5, 2, 4, 4, 4, 9, 9, 9, 1]) ➞ [2, 1]

returnUnique([9, 5, 6, 8, 7, 7, 1, 1, 1, 1, 1, 9, 8]) ➞ [5, 6]
Notes
Keep the same ordering in the output.
*/

function returnUnique(uniqueArray) {
  const dups = []; // array of all duplicates
  const res = []; // array that doesnt matter really
  for (let num of uniqueArray)
    if (!res.includes(num)) {
      // if num is not in 'res', push num in to 'res'
      res.push(num);
    } else {
      //else push num in to 'dups'
      dups.push(num);
    }
  return (uniqueArray = uniqueArray.filter(function (item) {
    return !dups.includes(item);
  })); // filter uses the 'uniqueArray' and filters the duplicates from 'dups'. returning the original array without 'dups'
}
exports.solution = returnUnique;
