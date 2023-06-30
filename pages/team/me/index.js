import { useEffect, useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { withRouter } from "next/router";
import CreateTeamLink from "../../../components/CreateTeamLink";
import { queries } from "../../../api";
import Input from "../../../components/team/Input";
import Error from "../../../components/Error";
import { Title, Form, Box } from "../../../components/team/Styles";
import MyTeamView from "../../../components/team/MyTeamView";

function MyTeam() {
  const [teamId, setTeamId] = useState(window.localStorage.getItem("credentialsTeamId"));
  const [formTeamCode, setFormTeamCode] = useState("");

  const [getTeam, { loading, error }] = useLazyQuery(queries.teamByCode, {
    onCompleted: (data) => {
      const {
        team: { _id, name },
      } = data;

      window.localStorage.setItem("credentialsTeamName", name);
      window.localStorage.setItem("credentialsTeamId", _id);
      setTeamId(_id);
    },
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSubmitClicked(true);
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
      {!teamId && (
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
      {teamId && <MyTeamView teamId={teamId} />}
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
