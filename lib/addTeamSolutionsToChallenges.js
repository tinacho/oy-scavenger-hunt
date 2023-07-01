export function addTeamSolutionsToChallenges(allChallenges, team) {
  const solvedChallengesMap = team.solutions.data.reduce((acc, solution) => {
    return {
      ...acc,
      [solution.challenge._id]: {
        ...solution.challenge,
        solution: solution,
      },
    };
  }, {});

  return allChallenges.map((challenge) => {
    if (solvedChallengesMap[challenge._id]) {
      return solvedChallengesMap[challenge._id];
    }
    return challenge;
  });
}
