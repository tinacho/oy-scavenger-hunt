import { useEffect, useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { withRouter } from "next/router";
import CreateTeamLink from "../../../components/CreateTeamLink";
import { queries } from "../../../api";
import Input from "../../../components/team/Input";
import Error from "../../../components/Error";
import { Title, Form, Box } from "../../../components/team/Styles";
import TeamView from "../../../components/team/TeamView";

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

  const [getTeam, { loading, error }] = useLazyQuery(queries.team, {
    onCompleted: (data) => {
      const {
        team: { _id, name },
      } = data;

      console.log("data", data);

      // call mutation action here after getting team members data and all this is done in mutation onCompleted callback
      window.localStorage.setItem("credentialsTeamName", name);
      window.localStorage.setItem("credentialsTeamId", _id);
      window.localStorage.setItem("credentialsUser", formUser);
      setTeamId(_id);
    },
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSubmitClicked(true);
      getTeam({ variables: { id: formTeamId } });
    },
    [formTeamId, getTeam]
  );

  if (error) {
    return <Error />;
  }

  if (loading) {
    return null;
  }

  return (
    <Box>
      <Title>My team</Title>
      {!teamId && (
        <>
          <Text>
            You&apos;re not yet in a team. You can join an existing team:
          </Text>
          <StyledForm>
            <Input value={formUser} title="User name:" setter={setFormUser} />
            <Input value={formTeamId} title="Team id:" setter={setFormTeamId} />
            <button onClick={onSubmit}>Join</button>
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
