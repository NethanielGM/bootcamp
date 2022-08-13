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

function convert(temp) {
  let x = temp.split("°");
  if (x[1] == "F") {
    return Math.round(((x[0] - 32) * 5) / 9) + "°C";
  }
  if (x[1] == "C") {
    return Math.round((x[0] * 9) / 5 + 32) + "°F";
  }
  return "Error";
}
exports.solution = convert;
