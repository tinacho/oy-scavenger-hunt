import { useState } from "react";
import { compose } from "ramda";
import { useMutation } from "@apollo/client";
import { queries, mutations, withApiData } from "../../api";
import { getTeamScore } from "@/lib/getTeamScore";
import { LogoPreview } from "../team/TeamLogo";
import { UploadWidget } from "../UploadWidget";

const teamUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_TEAM;

function MyTeamView({ data }) {
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
        <LogoPreview
          path={logoSrc}
          withActions={true}
          handlePicChange={handleTeamLogoChange}
        ></LogoPreview>
      )}
      {!logoSrc && (
        <UploadWidget
          uploadPreset={teamUploadPreset}
          setUploadInfo={handleTeamLogoUpdate}
        ></UploadWidget>
      )}
      <div>{data.team.name}</div>
      <div>Use this code to enter this team: {data.team.code}</div>
      <div>Current score: {getTeamScore(data.team)}</div>
      <div>
        <h2>Members:</h2>
        <ul>
          {data.team.members.map((member) => (
            <li key={member.name}>{member.name}</li>
          ))}
        </ul>
        {/* TODO: add member, complete challenge etc */}
      </div>
    </>
  );
}

export default compose(
  withApiData({
    query: queries.teamMe,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(MyTeamView);
