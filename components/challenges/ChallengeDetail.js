import styled from "styled-components";
import { useState } from "react";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import { useMutation } from "@apollo/client";
import { mutations, queries } from "@/api";
import { useCallback } from "react";
import { useFeedback } from "../Feedback";
import { CloseIcon } from "../icons";
import { Button } from "../Button";
import { UploadWidget } from "../UploadWidget";
import { Footer, StyledCheckmark, Points } from "./Styles";
import { UPLOAD_PRESETS } from "@/lib/constants";

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(10 10 10 / 0.9);
  z-index: 0;
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  background-color: var(--light-primary);
  color: var(--dark-primary);
  z-index: 1;
  position: relative;
  padding: 15px;
  max-width: var(--max-content-width);
  margin: auto;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  .cld-video-player {
    height: 100% !important;
  }

  img {
    max-height: 70vh;
    object-fit: contain;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
`;

const StyledPoints = styled(Points)`
  height: var(--input-height);
  padding: 0 20px;
  width: fit-content;
  background-color: ${(props) =>
    props.solved ? "var(--positive-dark)" : "var(--light-secondary)"};
`;

const StyledButton = styled(Button)`
  height: var(--input-height);
  padding: 0 20px;
  margin: 0;
  margin-left: auto;
`;

export function ChallengeDetail({ team, challenge, onClose, editable }) {
  const solved = !!challenge.solution;

  const RenderComponent = solved ? Solved : Unsolved;

  return (
    <RenderComponent
      challenge={challenge}
      team={team}
      onClose={onClose}
      editable={editable}
    ></RenderComponent>
  );
}

function getMediaUrl(resultInfo) {
  if (resultInfo.resource_type === "video") {
    return resultInfo.secure_url.replace(
      new RegExp(`.${resultInfo.format}$`),
      ".mp4"
    );
  }
  return resultInfo.secure_url;
}

function Unsolved({ challenge, team, onClose, editable }) {
  const feedback = useFeedback();

  // TODO add upload widget in here and the detail body
  const needsMedia = challenge.type !== "SIMPLE";
  const [media, setMedia] = useState("");

  const handleMediaUpload = (info) => {
    const mediaUrl = getMediaUrl(info);
    setMedia(mediaUrl);
    // solve the challenge automatically
    solveChallenge(mediaUrl);
  };

  const [createSolution, { loading }] = useMutation(mutations.createSolution, {
    onCompleted: (data) => {
      console.log("solved!!", data);
      onClose();
    },
    // TODO investigating updating our cache ourselves
    //https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    refetchQueries: [queries.teamMe],
  });

  const solveChallenge = useCallback(
    (media) => {
      createSolution({
        variables: {
          data: {
            team: { connect: team._id },
            challenge: { connect: challenge._id },
            media,
          },
        },
      }).then(
        () => {
          feedback.open({
            message: "Solution submitted!",
            mode: "SUCCESS",
          });
        },
        (error) => {
          // uniqueness is guaranteed by a database index
          if (error.message.includes("is not unique")) {
            feedback.open({
              message: "Already Solved!",
              mode: "ERROR",
              timeout: null,
            });
          } else {
            feedback.open({
              message: "Error - could not create solution: " + error.message,
              mode: "ERROR",
              timeout: null,
            });
          }
        }
      );
    },
    [team, challenge, createSolution, feedback]
  );

  return (
    <Box>
      <InnerBox>
        <Header solved={false}>
          <div>{challenge.name}</div>
          <button onClick={onClose} disabled={loading}>
            <CloseIcon />
          </button>
        </Header>
        <Content>
          {editable && challenge.type !== "SIMPLE" && !media && (
            <UploadWidget
              uploadPreset={
                challenge.type === "VIDEO"
                  ? UPLOAD_PRESETS.VIDS
                  : UPLOAD_PRESETS.PICS
              }
              setUploadInfo={handleMediaUpload}
              buttonText={
                "Upload a " + (challenge.type === "VIDEO" ? "Video" : "Picture")
              }
              options={{
                sources: ["local", "camera"],
                resourceType: challenge.type === "VIDEO" ? "video" : "image",
                maxFileSize:
                  challenge.type === "VIDEO"
                    ? 100 * 2 ** 20 // 100MB limit for videos
                    : 20 * 2 ** 20, // 10MB limit for pictures
                tags: [team.name],
              }}
            ></UploadWidget>
          )}
          {media &&
            (challenge.type === "IMAGE" ? (
              <CldImage
                src={media}
                alt="challenge picture"
                width="900"
                height="900"
              ></CldImage>
            ) : (
              challenge.type === "VIDEO" && (
                <CldVideoPlayer
                  src={media}
                  alt="challenge video"
                  width="900"
                  height="900"
                ></CldVideoPlayer>
              )
            ))}
        </Content>
        <Footer>
          <StyledPoints
            solved={false}
          >{`Points: ${challenge.score}`}</StyledPoints>
          <StyledCheckmark solved={false} />
          {editable && (
            <StyledButton
              disabled={loading || (needsMedia && !media)}
              onClick={solveChallenge}
              text="Solve"
              small
            />
          )}
        </Footer>
      </InnerBox>
      <Overlay onClick={onClose} />
    </Box>
  );
}

function Solved({ challenge, onClose, editable }) {
  const feedback = useFeedback();

  const [deleteSolution, { loading }] = useMutation(mutations.deleteSolution, {
    onCompleted: (data) => {
      console.log("no longer solved!!", data);
    },
    // TODO investigating updating our cache ourselves
    //https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    refetchQueries: [queries.teamMe],
  });

  const resetChallenge = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to reset this challenge? Your progress and image will be lost."
      )
    ) {
      deleteSolution({
        variables: {
          id: challenge.solution._id,
        },
      }).then(
        () => {
          feedback.open({
            message: "Challenge successfully reset!",
            mode: "SUCCESS",
          });
          onClose();
        },
        (error) => {
          feedback.open({
            message: "Error - reset challenge: " + error.message,
            mode: "ERROR",
            timeout: null,
          });
        }
      );
    }
  }, [challenge, deleteSolution, feedback, onClose]);

  return (
    <Box>
      <InnerBox>
        <Header solved={true}>
          <div>{challenge.name}</div>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </Header>
        <Content>
          {challenge.solution.media &&
            (challenge.type === "IMAGE" ? (
              <CldImage
                src={challenge.solution.media}
                alt="challenge picture"
                width="900"
                height="900"
              ></CldImage>
            ) : (
              <CldVideoPlayer
                src={challenge.solution.media}
                alt="challenge video"
                width="900"
                height="900"
              ></CldVideoPlayer>
            ))}
        </Content>
        <Footer>
          <StyledPoints
            solved={true}
          >{`Score: ${challenge.score}`}</StyledPoints>
          <StyledCheckmark solved={true} />
          {editable && (
            <StyledButton
              disabled={loading}
              onClick={resetChallenge}
              text="Reset"
              small
            />
          )}
        </Footer>
      </InnerBox>
      <Overlay onClick={onClose} />
    </Box>
  );
}
