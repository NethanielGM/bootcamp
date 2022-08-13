/*
Create a function that takes the current day (e.g. "2019-09-30"), an array of date objects and returns the "current streak" (i.e. number of consecutive days in a row).

Examples
currentStreak("2019-09-23", [
 {
 date: "2019-09-18"
 },
 {
 date: "2019-09-19"
 },
 {
 date: "2019-09-21"
 },
 {
 date: "2019-09-22"
 },
 {
 date: "2019-09-23"
 }
]) ➞ 3

currentStreak("2019-09-25", [
 {
 date: "2019-09-16"
 },
 {
 date: "2019-09-17"
 },
 {
 date: "2019-09-21"
 },
 {
 date: "2019-09-22"
 },
 {
 date: "2019-09-23"
 }
]) ➞ 0
Notes
The array of dates is sorted chronologically.
The today parameter will always be greater than or equal to the last date in the array.
An empty array should return 0.
*/

function currentStreak(currrentDay, arr) {
  let streak = 0;
  arr.reverse().forEach((element, i) => {
    let elemDate = element.date; // reverse the array so we can compare the last "day" at start
    if (new Date(currrentDay) - new Date(elemDate) === i * 86400000) streak++; // example: currrentDay(1569369600000) - elemDate(1569196800000) === index(0) * 86400000(one day) streak++
  });
  return streak; //return the count or streak in this case
}
exports.solution = currentStreak;
