import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "next/router";
import Error from "../../../components/Error";
import Input from "../../../components/team/Input";
import { Title, Form, Box } from "../../../components/team/Styles";
import { mutations } from "../../../api";
import { SessionContext } from "@/lib/session";
import { generateTeamCode } from "@/lib/generateTeamCode";
import styled from "styled-components";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const teamUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_TEAM;

function CreateNewTeam({ router }) {
  const { login } = useContext(SessionContext);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [name, setName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [lead, setLead] = useState("");
  const [uploadError, updateUploadError] = useState();

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

  const handleOnUpload = ({ event, info }, widget) => {
    console.log("handleOnUpload", event, info);
    if (event === "success") {
      setLogoSrc(info.path);
    }
    widget.close({
      quiet: true,
    });
  };

  const handleOnUploadError = (error) => {
    console.error("handleOnUploadError", error);
    updateUploadError(error);
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
        <Input value={name} title="Team name:" setter={setName} />
        {!logoSrc && (
          <>
            <CldUploadWidget
              options={{
                sources: [
                  "local",
                  "camera",
                  "url",
                  "image_search",
                  "instagram",
                ],
              }}
              uploadPreset={teamUploadPreset}
              onUpload={handleOnUpload}
              onError={handleOnUploadError}
            >
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button className="button" onClick={handleOnClick}>
                    Upload a Team Picture
                  </button>
                );
              }}
            </CldUploadWidget>
          </>
        )}
        {logoSrc && (
          <LogoBox>
            <CldImage
              src={logoSrc}
              alt="Uploaded image"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </LogoBox>
        )}
        {uploadError && <p>{uploadError.status}</p>}
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
