import { queries, withApiData } from "@/api";
import { Challenges } from "@/components/cchallenges";
import { Title } from "@/components/team/Styles";
import { addTeamSolutionsToChallenges } from "@/lib/addTeamSolutionsToChallenges";
import { withSessionState } from "@/lib/session";
import { compose } from "ramda";
import { useMemo } from "react";

// just for now, to be integrated in the team view (maybe we need settings and challenges tabs in there?)
function MyTeamChallenges({ data }) {
  const challengesWithSolutions = useMemo(
    () => addTeamSolutionsToChallenges(data.allChallenges.data, data.team),
    [data]
  );

  console.log("data", data, challengesWithSolutions);

  return (
    <>
      <Title>{data.team.name}</Title>
      <Challenges challenges={challengesWithSolutions} />
    </>
  );
}

export default compose(
  withSessionState,
  withApiData({
    query: queries.teamMe,
    propMapper: ({ session }) => ({ id: session.getSession().teamId }),
  })
)(MyTeamChallenges);
