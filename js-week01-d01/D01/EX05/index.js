function moduloEx5(x, y) {
  let sentence;
  let result;

  if (x < y) {
    sentence = `The number ${x} is less than ${y}`;
  }
  if (x > y) {
    sentence = `The number ${x} is bigger than ${y}`;
  }
  if (x == y) {
    sentence = `The number ${x} is equal to ${y}`;
  }
  if (x > y && x % y !== 0) {
    result = x % y;

    sentence = `The number ${x} is bigger than ${y}. But the modulo of ${x} % ${y} is ${result}`;
  }
  console.log(sentence);
}

// Do not remove or change this line, or the tests won't work
export { moduloEx5 };
