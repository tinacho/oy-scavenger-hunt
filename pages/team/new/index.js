import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "next/router";
import Error from "../../../components/Error";
import Input from "../../../components/team/Input";
import { LogoPreview } from "../../../components/team/TeamLogo";

import { UploadWidget } from "../../../components/UploadWidget";
import { Title, Form, Box } from "../../../components/team/Styles";
import { mutations } from "../../../api";
import { SessionContext } from "@/lib/session";
import { generateTeamCode } from "@/lib/generateTeamCode";
import styled from "styled-components";

const teamUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_TEAM;

function CreateNewTeam({ router }) {
  const { login } = useContext(SessionContext);
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
        teamName: name,
      });
      router.push(`/team/me`);
    },
  });

  const handleUpload = ({ path }) => {
    setLogoSrc(path);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    createTeam({
      variables: {
        data: {
          name,
          logoSrc,
          members: [{ name: lead }],
          code: generateTeamCode(),
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
        {!logoSrc && (
          <UploadWidget
            uploadPreset={teamUploadPreset}
            setUploadInfo={handleUpload}
          > </UploadWidget>
        )}
        {logoSrc && (
          <LogoPreview path={logoSrc} />
        )}

        <Input value={name} title="Team name:" setter={setName} />
        <Input value={lead} title="Team lead:" setter={setLead} />
        <button type="submit" disabled={!(name && logoSrc && lead)}>
          Create new team
        </button>
      </Form>
    </Box>
  );
}

const LogoBox = styled.div`
  border-radius: 300px;
  overflow: hidden;
  width: 128px;
  height: 128px;
  margin-left: auto;
  margin-right: auto;
`;

export default withRouter(CreateNewTeam);
