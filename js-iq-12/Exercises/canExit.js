/*
A maze can be represented by a 2D matrix, where 0s represent walkable areas, and 1s represent walls. You start on the upper left corner and the exit is on the most lower right cell.
Create a function that returns true if you can walk from one end of the maze to the other. You can only move up, down, left and right. You cannot move diagonally.
Examples
canExit([
  [0, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 0]
]) ➞ true
canExit([
  [0, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 1, 1, 1]
]) ➞ false
// This maze only has dead ends!
canExit([
  [0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1]
]) ➞ false
// Exit only one block away, but unreachable!
canExit([
  [0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 0]
]) ➞ true
Notes
In a maze of size m x n, you enter at [0, 0] and exit at [m-1, n-1].
There can be dead ends in a maze - one exit path is sufficient.
*/
function canExit(maze) {
  // VERY NOT ORIGINAL SOLUTION
  if (maze[0][0] || maze.at(-1).at(-1)) return false; // Check for valid entry and exit points
  const move = ([row, col], previous = [], junctions = []) => {
    const adjacent = [
      [row, col + 1], // Next col
      [row + 1, col], // Next row
      [row, col - 1], // Previous col
      [row - 1, col], // Previous row
    ];
    const nextAvailable = adjacent.filter(
      ([row, col]) =>
        (row !== previous[0] || col !== previous[1]) && // Check if not previous
        maze[row] !== undefined && // Check if row exists
        maze[row][col] !== undefined && // Check if col exists
        !maze[row][col] // Return true if value = 0
    );
    if (nextAvailable.length <= 1) maze[row][col] = 1; // If not a junction make unavailable
    const isLast =
      row === maze.length - 1 && // Last row
      col === maze[0].length - 1; // Last col
    if (isLast) {
      return true; // Exited successfully!
    } else if (nextAvailable.length) {
      return move(
        nextAvailable.shift(), // Get first available coordinate
        [row, col], // Set current coordinate as previous
        [...junctions, ...nextAvailable] // Save other junctions
      );
    } else if (junctions.length) {
      return move(junctions.pop(), [row, col], junctions); // Move to last junction
    } else {
      return false; // No exit possible:(
    }
  };
  return move([0, 0]);
}

exports.solution = canExit;
