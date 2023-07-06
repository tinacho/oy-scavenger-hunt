import { compose } from "ramda";
import { useState, useMemo } from "react";
import { queries, mutations, withApiData } from "../../api";
import { getTeamScore } from "@/lib/getTeamScore";
import { addTeamSolutionsToChallenges } from "@/lib/addTeamSolutionsToChallenges";
import { AddMember } from "./AddMember";
import TeamPictureUpload from "./TeamPictureUpload";
import { Challenges } from "@/components/challenges";
import { Button } from "../Button";
import { Section, Strong, Title } from "../Styles";
import Member from "./Member";
import { useSessionContext } from "@/lib/session";
import { useMutation } from "@apollo/client";
import { withRouter } from "next/router";
import styled from "styled-components";
import { GAME_MASTER } from "@/lib/constants";

function TeamView({ data, isMyTeam = false, router }) {
  const [scorecardOpen, setScorecardOpen] = useState(false);
  const session = useSessionContext();
  const { isGameMaster } = session;
  const openScorecard = () => setScorecardOpen(true);
  const closeScorecard = () => setScorecardOpen(false);

  const challengesWithSolutions = useMemo(
    () => addTeamSolutionsToChallenges(data.allChallenges.data, data.team),
    [data]
  );

  const [deleteTeam] = useMutation(mutations.deleteTeam, {
    onCompleted: () => {
      console.log("deleted!!");
      router.push(`/`);
    },
  });

  const handleDeleteTeam = () => {
    deleteTeam({
      variables: { id: data.team._id },
    });
  };

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
            team={data.team}
            isOpen={scorecardOpen}
            closeScorecard={closeScorecard}
            editable={isMyTeam || isGameMaster}
          />
        )}
      </Section>
      <Section>
        <h2>Team picture</h2>
        <TeamPictureUpload data={data} isMyTeam={isMyTeam} />
      </Section>
      {(isMyTeam || isGameMaster) && (
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
      {isGameMaster && data.team.name !== GAME_MASTER.name && (
        <Section>
          <DeleteButton onClick={handleDeleteTeam} text="Delete Team" />
        </Section>
      )}
    </>
  );
}

const DeleteButton = styled(Button)`
  margin-top: 1000px;
  color: black;
  background-color: red;
`;

export default compose(
  withApiData({
    query: queries.teamMe,
    propMapper: ({ teamId }) => ({ id: teamId }),
  }),
  withRouter
)(TeamView);
