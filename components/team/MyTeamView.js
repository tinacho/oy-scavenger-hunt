import { compose } from "ramda";
import styled from "styled-components";
import { queries, withApiData } from "../../api";
import { getTeamScore } from "@/lib/getTeamScore";
import { PlusIcon } from "@/components/icons";

function MyTeamView({ data }) {
  return (
    <>
      <Section>
        <span>Use this code to enter the team</span>
        <Strong>{data.team.code}</Strong>
      </Section>
      <Section>
        Current score<Strong>{getTeamScore(data.team)}</Strong>
      </Section>
      <Section>
        <h2>Members</h2>
        <ul>
          {data.team.members.map((member) => (
            <li key={member.name}>
              <Strong>{member.name}</Strong>
            </li>
          ))}
        </ul>
        {/* TODO: add member, complete challenge etc */}
      </Section>
      <Section>
        <h2>Add members</h2>
        <Button>
          <PlusIcon />
        </Button>
        {/* TODO: add member, complete challenge etc */}
      </Section>
    </>
  );
}

const Strong = styled.strong`
  color: var(--text-accent);
  text-transform: uppercase;
  font-size: 32px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: var(--text-accent);
  display: flex;
  align-items: center;
  justify-content: center;
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
)(MyTeamView);
