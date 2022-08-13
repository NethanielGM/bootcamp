/*
Return the coordinates ([row, col]) of the element that differs from the rest.

Examples
whereIsWaldo([
 ["A", "A", "A"],
 ["A", "A", "A"],
 ["A", "B", "A"]
]) ➞ [ 2, 1]

whereIsWaldo([
 ["c", "c", "c", "c"],
 ["c", "c", "c", "d"]
]) ➞ [1, 3]

whereIsWaldo([
 ["O", "O", "O", "O"],
 ["O", "O", "O", "O"],
 ["O", "O", "O", "O"],
 ["O", "O", "O", "O"],
 ["P", "O", "O", "O"],
 ["O", "O", "O", "O"]
]) ➞ [4, 0]
Notes
Rows and columns are 0-indexed.
*/

function whereIsWaldo(arr) {
  const arr1 = arr.flat().filter((value, i, self) => {
    return self.indexOf(value);
  });
  for (let i = 0; i < arr.length; i++) {
    let index = arr[i].indexOf(arr1[0]);
    if (index > -1) {
      return [i, index];
    }
  }
}
exports.solution = whereIsWaldo;
