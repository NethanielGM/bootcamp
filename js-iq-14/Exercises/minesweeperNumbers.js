/*
Create a function that takes an array representation of a Minesweeper board, and returns another board where the value of each cell is the amount of its neighbouring mines.

Examples
The input may look like this:

[
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
]
The 0 represents an empty space. The 1 represents a mine.

You will have to replace each mine with a 9 and each empty space with the number of adjacent mines, the output will look like this:

[
  [1, 9, 2, 1],
  [2, 3, 9, 2],
  [3, 9, 4, 9],
  [9, 9, 3, 1],
]
Notes
Since in the output the numbers 0-8 are used to determine the amount of adjacent mines, the number 9 will be used to identify the mines instead.
A wikipedia page explaining how Minesweeper works is available in the Resources tab
*/

function minesweeperNumbers(matrix) {
  const board = []
  for (let i = 0; i < matrix.length; i++) {
    board.push([])
    for (let j = 0; j < matrix[0].length; j++) {
      board[i][j] = 0

      //Above
      if (matrix[i - 1]) {
        if (matrix[i - 1][j]) {
          board[i][j]++
        }
      }
      //Below
      if (matrix[i + 1]) {
        if (matrix[i + 1][j]) {
          board[i][j]++
        }
      }
      //Left
      if (matrix[i][j - 1]) {
        if (matrix[i][j - 1]) {
          board[i][j]++
        }
      }
      //Right
      if (matrix[i][j + 1]) {
        if (matrix[i][j + 1]) {
          board[i][j]++
        }
      }
      //Top Left
      if (matrix[i - 1]) {
        if (matrix[i - 1][j - 1]) {
          board[i][j]++
        }
      }
      //Top Right
      if (matrix[i - 1]) {
        if (matrix[i - 1][j + 1]) {
          board[i][j]++
        }
      }
      //Bottom Left
      if (matrix[i + 1]) {
        if (matrix[i + 1][j - 1]) {
          board[i][j]++
        }
      }
      //Bottom Right
      if (matrix[i + 1]) {
        if (matrix[i + 1][j + 1]) {
          board[i][j]++
        }
      }
      //Find Bomb
      if (matrix[i][j] === 1) {
        board[i][j] = 9
      }
    }
  }
  return board
}
exports.solution = minesweeperNumbers;
