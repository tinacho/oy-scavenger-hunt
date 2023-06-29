import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import CreateTeamLink from "../../../components/CreateTeamLink";
import Input from "../components/Input";
import { Title, Form, Box } from "../components/Styles";
import TeamView from "../components/TeamView";

function MyTeam() {
  const [teamId, setTeamId] = useState(null);
  const [formUser, setFormUser] = useState("");
  const [formTeamId, setFormTeamId] = useState("");

  useEffect(() => {
    const teamId = window.localStorage.getItem("credentialsTeamId");
    if (teamId) {
      setTeamId(teamId);
    }
  }, []);

  return (
    <Box>
      {!teamId && (
        <>
          <Title>My team</Title>
          <Text>
            You&apos;re not yet in a team. You can join an existing team:
          </Text>
          <StyledForm>
            <Input value={formUser} title="User name:" setter={setFormUser} />
            <Input value={formTeamId} title="Team id:" setter={setFormTeamId} />
            <button>Join</button>
          </StyledForm>
          <Text>Or create a new team:</Text>
          <CreateTeamLink />
        </>
      )}
      {teamId && <TeamView teamId={teamId} />}
      {/* render team view that renders the same stuff as regular team view, it's just possible to edit challenges, difference is a prop isMyTeam or something like that */}
    </Box>
  );
}

const Text = styled.div`
  margin-bottom: 30px;
`;

const StyledForm = styled(Form)`
  margin-bottom: 60px;
`;

export default withRouter(MyTeam);
