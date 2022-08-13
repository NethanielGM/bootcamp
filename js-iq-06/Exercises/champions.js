// Create a function that takes an array of football clubs with properties: name, wins, loss, draws, scored, conceded, and returns the team name with the highest number of points. If two teams have the same number of points, return the team with the largest goal difference.
// How to Calculate Points and Goal Difference
// team = {name: "Manchester United", wins: 30, loss: 3, draws: 5, scored: 88, conceded: 20 }

// Total Points = 3 * wins + 0 * loss + 1 * draws = 3 * 30 + 0 * 3 + 5 * 1 = 95 points
// Goal Difference = scored - conceded = 88 - 20 = 68
// const array = [
//   {
//     name: "Manchester City",
//     wins: 30,
//     loss: 6,
//     draws: 2,
//     scored: 102,
//     conceded: 20,
//   },
//   { name: "Liverpool", wins: 24, loss: 6, draws: 8, scored: 118, conceded: 29 },
//   { name: "Arsenal", wins: 28, loss: 2, draws: 8, scored: 87, conceded: 39 },
// ];
function champions(teams) {
  const [firstPlace, secondPlace] = teams
    .map((team) => ({
      name: team.name,
      totalPoints: 3 * team.wins + 1 * team.draws,
      goalDifference: team.scored - team.conceded,
    }))
    .sort((a, b) =>
      a.totalPoints < b.totalPoints ? 1 : a.totalPoints > b.totalPoints ? -1 : 0
    );
  if (firstPlace.totalPoints === secondPlace.totalPoints) {
    return firstPlace.goalDifference >= secondPlace.goalDifference
      ? firstPlace.name
      : secondPlace.name;
  }
  return firstPlace.name;
}
exports.solution = champions;

//   let champs = [];
//   array.forEach((element) => {
//     champs.push({
//       name: element.name,
//       totalPoints: 3 * element.wins + 1 * element.draws,
//       goalDiffrence: element.scored - element.conceded,
//     });
//   });
//   champs.sort(
//     (a, b) =>
//       a.totalPoints < b.totalPoints ? 1 : a.totalPoints > b.totalPoints ? -1 : 0 // sort will show [0] as highest value
//   );
//   if (champs[0].totalPoints === champs[1].totalPoints) {
//     if (champs[0].goalDiffrence > champs[1].goalDiffrence) {
//       return champs[0].name; // if totalPoints are equel. And goalDiffrence of [0] is bigger than [1] return [0].name
//     }
//     if (champs[1].goalDiffrence > champs[0].goalDiffrence) {
//       return champs[1].name; // if totalPoints are equel. And goalDiffrence of [1] is bigger than [0] return [1].name
//     }
//   }
//   return champs[0].name; // else. if [0]totalPoints is not equel to [1]totalPoints return [0].name
// }
