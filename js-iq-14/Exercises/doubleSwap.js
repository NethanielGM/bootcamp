/*
Write a function to replace all instances of character char1 with character char2 and vice versa.

Examples
doubleSwap( "aabbccc", "a", "b") ➞ "bbaaccc"

doubleSwap("random w#rds writt&n h&r&", "#", "&")
➞ "random w&rds writt#n h#r#"

doubleSwap("128 895 556 788 999", "8", "9")
➞ "129 985 556 799 888"
Notes
Both characters will show up at least once in the stringing.
*/

function doubleSwap(string, char1, char2) {
  return string.split('').map((char, i) => {
    if (char == char1) {
      return char2
    } else if (char == char2) {
      return char1
    } else {
      return string[i]
    }
  }).join('');
}

exports.solution = doubleSwap;