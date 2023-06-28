import { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import CreateTeamLink from "../../../components/CreateTeamLink";
import Input from "../components/Input";
import { Title, Form } from "../components/Styles";

function MyTeam({ router }) {
  const [user, setUser] = useState("");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    const teamId = window.localStorage.getItem("credentialsTeamId");
    if (teamId) {
      setTeamId(teamId);
      router.push(`/team/${teamId}`);
    }
  }, []);

  // if not in local storage then say that and show a button to go to create team form or join team form
  return (
    <Box>
      <Title>My team</Title>
      <div>
        You&apos;re not yet in a team. You can either join an existing team:
      </div>
      <Form>
        <Input value={user} title="User name:" setter={setUser} />
        <Input value={teamId} title="Team id:" setter={setTeamId} />
        <button>Join</button>
      </Form>
      <div>Or join an existing one:</div>
      <CreateTeamLink />
      {/* render team view that renders the same stuff as regular team view, it's just possible to edit challenges, difference is a prop isMyTeam or something like that */}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px;
`;

export default withRouter(MyTeam);
