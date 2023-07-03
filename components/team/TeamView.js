import { compose } from "ramda";
import styled from "styled-components";
import { queries, withApiData } from "../../api";
import { getTeamScore } from "@/lib/getTeamScore";
import AddMember from "./AddMember";

function TeamView({ data, isMyTeam = false }) {
  return (
    <>
      {isMyTeam && (
        <Section>
          <span>Use this code to enter the team</span>
          <Strong>{data.team.code}</Strong>
        </Section>
      )}
      <Section>
        Current score<Strong>{getTeamScore(data.team)}</Strong>
      </Section>
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

const Member = styled.li`
  margin-bottom: 5px;
`;

const Strong = styled.strong`
  color: var(--text-accent);
  text-transform: uppercase;
  font-size: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default compose(
  withApiData({
    query: queries.teamMe,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(TeamView);
