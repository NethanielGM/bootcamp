function modulo(x, y) {
  if (x < y) {
    console.log(`The number ${x} is less than ${y}`);
    return;
  }
  if (x == y) {
    console.log(`The number ${x} is equal to ${y}`);
    return;
  }
  if (x % y !== 0) {
    let result = x % y;
    console.log(`The number ${x} is bigger than ${y}`);
    console.log(`The modulo of ${x} % ${y} is ${result}`);
  } else {
    console.log(`The number ${x} is bigger than ${y}`);
  }
}
// Do not remove or change this line, or the tests won't work

export { modulo };
