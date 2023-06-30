import { useCallback, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "next/router";
import Error from "../../../components/Error";
import Input from "../../../components/team/Input";
import { Title, Form, Box } from "../../../components/team/Styles";
import { mutations } from "../../../api";
import { SessionContext } from "@/lib/session";
import { generateTeamCode } from "@/lib/generateTeamCode";

function CreateNewTeam({ router }) {
  const { login } = useContext(SessionContext)
  const [submitClicked, setSubmitClicked] = useState(false);
  const [name, setName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [lead, setLead] = useState("");

  const [createTeam, { loading, error }] = useMutation(mutations.createTeam, {
    onCompleted: (data) => {
      const {
        createTeam: { _id, name },
      } = data;
      login({
        teamId: _id,
        teamName: name
      })
      router.push(`/team/me`);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    createTeam({
      variables: {
        data: {
          name,
          logoSrc,
          members: [{ name: lead }],
          code: generateTeamCode()
        },
      },
    });
  };

  if (error) {
    return <Error />;
  }

  if (submitClicked || loading) {
    return null;
  }

  return (
    <Box>
      <Title>Create new team</Title>
      <Form onSubmit={onSubmit}>
        {/* handle duplicate name error (or check before sending if the same name exists in teams) */}
        <Input value={name} title="Team name:" setter={setName} />
        <Input
          value={logoSrc}
          title="Team picture:"
          setter={setLogoSrc}
          type="url"
        />
        <Input value={lead} title="Team lead:" setter={setLead} />
        <button type="submit" disabled={!(name && logoSrc && lead)}>
          Create new team
        </button>
      </Form>
    </Box>
  );
}

export default withRouter(CreateNewTeam);
