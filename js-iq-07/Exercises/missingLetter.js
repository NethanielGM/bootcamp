/*
What's the Missing Letter?
Given a string of letters in the English alphabet, return the letter that's missing from the string. The missing letter will make the string be in alphabetical order (from A to Z).

If there are no missing letters in the string, return "No Missing Letter".

Examples
missingLetter("abdefg") ➞ "c"

missingLetter("mnopqs") ➞ "r"

missingLetter("tuvxyz") ➞ "w"

missingLetter("ghijklmno") ➞ "No Missing Letter"
Notes
The given string will never have more than one missing letter.
*/

function missingLetter(str) {
  let start = str.charCodeAt(0); // get first character code
  let end = str.charCodeAt(str.length - 1); // get last character code
  for (let i = start; i <= end; i++) {
    const codeLetter = String.fromCharCode(i); // store letter using String from charCode(i)
    const strLetter = str[i - start]; //  store letter with the index of index - start value
    console.log(`${i - start} loop: ${codeLetter}`);
    console.log(`${i - start} loop: ${strLetter}`);
    console.log("-----------");
    if (codeLetter !== strLetter) {
      return codeLetter; // if the letters dont match return in this case "codeLetter"
    }
  }
  return "No Missing Letter";
}
missingLetter("tuvxyz");
exports.solution = missingLetter;
