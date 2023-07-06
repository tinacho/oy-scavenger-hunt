import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "next/router";
import Error from "@/components/Error";
import Input from "@/components/team/Input";
import { TeamPicture } from "@/components/team/TeamPicture";
import { UploadWidget } from "@/components/UploadWidget";
import {
  Title,
  Form,
  Box,
  Section,
  MemberItem,
  Strong,
} from "@/components/Styles";
import { AddMemberView } from "@/components/team/AddMemberView";
import { SubmitButton } from "@/components/Button";
import { mutations } from "../../../api";
import { SessionContext } from "@/lib/session";
import { generateTeamCode } from "@/lib/generateTeamCode";
import { UPLOAD_PRESETS, DEFAULT_TEAM_PIC } from "@/lib/constants";

function CreateNewTeam({ router }) {
  const { login } = useContext(SessionContext);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const [logoSrc, setLogoSrc] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  const onAddMemberSubmit = (e) => {
    e.preventDefault();
    setMembers([...members, { name: newMemberName }]);
    setInputVisible(false);
    setNewMemberName("");
  };

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
    let logo = logoSrc;
    if (!logoSrc) {
      logo = DEFAULT_TEAM_PIC;
    }
    createTeam({
      variables: {
        data: {
          name,
          logoSrc: logo,
          members:
            newMemberName.length > 1
              ? [...members, { name: newMemberName }]
              : members,
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
      <Form onSubmit={onSubmit} id="create-team-form">
        {/* handle duplicate name error (or check before sending if the same name exists in teams) */}
        <Section>
          {logoSrc ? (
            <TeamPicture path={logoSrc} />
          ) : (
            <UploadWidget
              uploadPreset={UPLOAD_PRESETS.TEAM}
              setUploadInfo={handleUpload}
              buttonText="Upload a Team Picture"
              options={{
                sources: ["local", "camera", "url", "image_search"],
                resourceType: "image",
                maxFileSize: 10 * 2 ** 20, // 10MB limit for pictures
              }}
            />
          )}
        </Section>
        <Input value={name} title="Team name" setter={setName} />
      </Form>
      <Section>
        <h2>Members</h2>
        <ul>
          {members.map((member, index) => (
            <MemberItem key={index}>
              <Strong>{member.name}</Strong>
            </MemberItem>
          ))}
        </ul>
        <AddMemberView
          inputVisible={inputVisible}
          setInputVisible={setInputVisible}
          newMemberName={newMemberName}
          setNewMemberName={setNewMemberName}
          onSubmit={onAddMemberSubmit}
          hideIcon
        />
      </Section>
      <SubmitButton
        type="submit"
        text="Create new team"
        disabled={!(name && (members.length > 0 || newMemberName.length > 1))}
        form="create-team-form"
      />
    </Box>
  );
}

export default withRouter(CreateNewTeam);
