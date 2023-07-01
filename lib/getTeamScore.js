export function getTeamScore(team) {
  return team.solutions.data.reduce(
    (acc, solution) => acc + solution.challenge.score,
    0
  );
}
