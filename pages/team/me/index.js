import { useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { withRouter } from "next/router";
import CreateTeamLink from "@/components/CreateTeamLink";
import { queries } from "@/api";
import Input from "@/components/team/Input";
import Error from "@/components/Error";
import { Title, Form, Box } from "@/components/team/Styles";
import MyTeamView from "@/components/team/MyTeamView";
import { SubmitButton } from "@/components/Button";
import { useFeedback } from "@/components/Feedback";
import { useSessionContext } from "@/lib/session";

function MyTeam() {
  const feedback = useFeedback();
  const { session, login } = useSessionContext();
  const [formTeamCode, setFormTeamCode] = useState("");

  const [getTeam, { loading, error }] = useLazyQuery(queries.teamByCode, {
    onCompleted: (data) => {
      if (data.team === null) {
        feedback.open({
          message: "Wrong team code",
          mode: "ERROR",
        });
        return;
      }

      const {
        team: { _id, name },
      } = data;

      feedback.open({
        message: `Successfully joined team: ${data.team.name}`,
        mode: "SUCCESS",
        timeout: 90000,
      });

      login({
        teamId: _id,
        teamName: name,
      });
    },
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      getTeam({ variables: { code: formTeamCode.toLocaleLowerCase() } });
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
      {!session.teamId && (
        <>
          <StyledTitle>Join team</StyledTitle>
          <Section>
            <Subtitle>
              To access the game, you need to be part of a team.
            </Subtitle>
          </Section>
          <Section>
            <Text>
              If you want to join an already existing team, enter a
              <Strong> 4 letter team code</Strong>. Any member of your team can
              see the code in &quot;My Team&quot; section.
            </Text>
            <Form>
              <Input
                value={formTeamCode}
                setter={setFormTeamCode}
                inputProps={{
                  maxLength: 4,
                  minLength: 4,
                  required: true,
                  placeholder: "Team Code",
                }}
              />
              <SubmitButton onClick={onSubmit} text="Join" />
            </Form>
          </Section>

          <Section>
            <Text>If you want to create a new team, just click here:</Text>
            <CreateTeamLink />
          </Section>
        </>
      )}
      {session.teamId && (
        <>
          <Title>{session.teamName}</Title>
          <MyTeamView teamId={session.teamId} />
        </>
      )}
    </Box>
  );
}

const Subtitle = styled.p`
  margin: 0;
  width: 100%;
  text-align: left;
`;

const Text = styled(Subtitle)`
  margin-bottom: 20px;
`;

const Strong = styled.strong`
  color: var(--text-accent);
`;

const Section = styled.div`
  width: 100%;
  padding: 30px 0;
`;

const StyledTitle = styled(Title)`
  margin: 0;
`;

export default withRouter(MyTeam);
