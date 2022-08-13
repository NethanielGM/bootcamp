/*
Create a function that converts Celcius to Fahrenheit and vice versa.

Examples
convert("35°C") ➞ "95°F"

convert("19°F") ➞ "-7°C"

convert("33") ➞ "Error"
Notes
Round to the nearest integer.
If the input is incorrect, return "Error".
*/

function convertTemp(input) {
  let checkF = "F";
  let checkC = "C";
  if (input.includes(checkC)) {
    const matches = input.match(/-?(\d+)/); // looks for a number with/out "-", returns only the number
    const cTemp = matches[0];
    const cToFahr = Math.round(cTemp * 1.8 + 32);
    return cToFahr + "\xB0F";
  }
  if (input.includes(checkF)) {
    const matches = input.match(/-?(\d+)/);
    const fTemp = matches[0];
    const fToCel = Math.round((fTemp - 32) / 1.8);
    return fToCel + "\xB0C";
  } else {
    return "Error";
  }
}
exports.solution = convertTemp;
