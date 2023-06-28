import { useState } from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "next/router";
import Error from "../../../components/Error";
import Input from "../components/Input";
import { Title, Form, Box } from "../components/Styles";
import { mutations } from "../../../api";

function CreateNewTeam({ router }) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [name, setName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [lead, setLead] = useState("");

  const [createTeam, { loading, error }] = useMutation(mutations.createTeam, {
    onCompleted: (data) => {
      const {
        createTeam: { _id, name, members },
      } = data;
      window.localStorage.setItem("credentialsTeamName", name);
      window.localStorage.setItem("credentialsTeamId", _id);
      window.localStorage.setItem("credentialsUser", members[0].name);
      router.push(`/team/${_id}`);
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
