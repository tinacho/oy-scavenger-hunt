import { useState } from "react";
import { useMutation } from "@apollo/client";
import { mutations } from "../../api";
import { TeamPicture } from "./TeamPicture";
import { UploadWidget } from "../UploadWidget";

const teamUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_TEAM;

function TeamPictureUpload({ data, isMyTeam }) {
  const [logoSrc, setLogoSrc] = useState(data.team.logoSrc);

  const [updateTeamLogo] = useMutation(mutations.partialUpdateTeam, {
    onCompleted: (data) => {
      console.log("updated!!", data);
    },
  });

  const handleTeamLogoChange = () => {
    setLogoSrc(null);
  };

  const handleTeamLogoUpdate = ({ path }) => {
    setLogoSrc(path);
    updateTeamLogo({
      variables: { id: data.team._id, data: { logoSrc: path } },
    });
  };

  return (
    <>
      {logoSrc && (
        <TeamPicture
          path={logoSrc}
          withActions={isMyTeam}
          handlePicChange={handleTeamLogoChange}
        ></TeamPicture>
      )}
      {!logoSrc && isMyTeam && (
        <UploadWidget
          uploadPreset={teamUploadPreset}
          setUploadInfo={handleTeamLogoUpdate}
          buttonText="Upload a Team Picture"
          options={{
            sources: ["local", "camera", "url", "image_search"],
            resourceType: "image",
          }}
        ></UploadWidget>
      )}
    </>
  );
}

export default TeamPictureUpload;
