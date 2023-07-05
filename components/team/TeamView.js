import { compose } from "ramda";
import { useState, useMemo } from "react";
import { queries, withApiData } from "../../api";
import { getTeamScore } from "@/lib/getTeamScore";
import { addTeamSolutionsToChallenges } from "@/lib/addTeamSolutionsToChallenges";
import { AddMember } from "./AddMember";
import TeamPictureUpload from "./TeamPictureUpload";
import { Challenges } from "@/components/challenges";
import { Button } from "../Button";
import { Section, Strong, Title } from "../Styles";
import Member from "./Member";

function TeamView({ data, isMyTeam = false }) {
  const [scorecardOpen, setScorecardOpen] = useState(false);
  const openScorecard = () => setScorecardOpen(true);
  const closeScorecard = () => setScorecardOpen(false);

  const challengesWithSolutions = useMemo(
    () => addTeamSolutionsToChallenges(data.allChallenges.data, data.team),
    [data]
  );

  return (
    <>
      <Title>{data.team.name}</Title>
      <Section>
        <h2>Current score</h2>
        <Strong>{getTeamScore(data.team)}</Strong>
        <Button
          text={scorecardOpen ? "Close scorecard" : "Open scorecard"}
          onClick={scorecardOpen ? closeScorecard : openScorecard}
          small
        />
        {scorecardOpen && (
          <Challenges
            challenges={challengesWithSolutions}
            isOpen={scorecardOpen}
            closeScorecard={closeScorecard}
            isMyTeam={isMyTeam}
          />
        )}
      </Section>
      <Section>
        <h2>Team picture</h2>
        <TeamPictureUpload data={data} isMyTeam={isMyTeam} />
      </Section>
      {isMyTeam && (
        <Section>
          <h2>Use this code to enter the team</h2>
          <Strong>{data.team.code}</Strong>
        </Section>
      )}
      <Section>
        <h2>Members</h2>
        <ul>
          {data.team.members.map((member, index) => (
            <Member
              key={index}
              data={data}
              name={member.name}
              isMyTeam={isMyTeam}
            ></Member>
          ))}
        </ul>
      </Section>
      {isMyTeam && (
        <Section>
          <h2>Add member to team:</h2>
          <AddMember data={data} />
        </Section>
      )}
    </>
  );
}

export default compose(
  withApiData({
    query: queries.teamMe,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(TeamView);
