import { useState, useCallback, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { withRouter } from "next/router";
import CreateTeamLink from "../../../components/CreateTeamLink";
import { queries } from "../../../api";
import Input from "../../../components/team/Input";
import Error from "../../../components/Error";
import { Title, Form, Box } from "../../../components/team/Styles";
import MyTeamView from "../../../components/team/MyTeamView";
import { SessionContext } from "@/lib/session";

function MyTeam() {
  const { session, login } = useContext(SessionContext)

  const [formTeamCode, setFormTeamCode] = useState("");

  const [getTeam, { loading, error }] = useLazyQuery(queries.teamByCode, {
    onCompleted: (data) => {
      const {
        team: { _id, name },
      } = data;

      login({
        teamId: _id,
        teamName: name
      })
    },
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      getTeam({ variables: { code: formTeamCode } });
    },
    [formTeamCode, getTeam]
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
      {!session.teamId && (
        <>
          <Text>
            You&apos;re not yet in a team. You can join an existing team:
          </Text>
          <StyledForm>
            <Input value={formTeamCode} title="Team Code:" setter={setFormTeamCode} />
            <button onClick={onSubmit}>Join</button>
          </StyledForm>
          <Text>Or create a new team:</Text>
          <CreateTeamLink />
        </>
      )}
      {session.teamId && <MyTeamView teamId={session.teamId} />}
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
