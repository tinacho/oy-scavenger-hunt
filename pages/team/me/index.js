import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import CreateTeamLink from "../../../components/CreateTeamLink";
import Input from "../components/Input";
import { Title, Form, Box } from "../components/Styles";

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
      <div>Or create a new team:</div>
      <CreateTeamLink />
      {/* render team view that renders the same stuff as regular team view, it's just possible to edit challenges, difference is a prop isMyTeam or something like that */}
    </Box>
  );
}

export default withRouter(MyTeam);
