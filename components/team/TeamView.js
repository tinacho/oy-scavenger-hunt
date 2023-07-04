import { compose } from "ramda";
import { useState } from "react";
import { queries, withApiData } from "../../api";
import { getTeamScore } from "@/lib/getTeamScore";
import { AddMember } from "./AddMember";
import TeamPictureUpload from "./TeamPictureUpload";
import { Challenges } from "@/components/challenges";
import { Button } from "../Button";
import { Section, Strong, Member } from "./Styles";

function TeamView({ data, isMyTeam = false }) {
  const [scorecardOpen, setScorecardOpen] = useState(false);
  const openScorecard = () => setScorecardOpen(true);
  const closeScorecard = () => setScorecardOpen(false);
  return (
    <>
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
            challenges={data.allChallenges.data}
            isOpen={scorecardOpen}
            closeScorecard={closeScorecard}
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
            <Member key={index}>
              <Strong>{member.name}</Strong>
            </Member>
          ))}
        </ul>
      </Section>
      {isMyTeam && (
        <Section>
          <h2>Add member to team:</h2>
          <AddMember data={data} />
          {/* TODO: complete challenge etc */}
          {/* TODO: remove member */}
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
