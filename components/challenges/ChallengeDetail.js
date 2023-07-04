import styled from "styled-components";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { mutations, queries } from "@/api";
import { useCallback } from "react";
import { useSessionContext } from "@/lib/session";
import { useFeedback } from "../Feedback";

// const Box = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   padding: 20px;
//   padding-top: 60px;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
// `;

// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgb(10 10 10 / 0.5);
// `;

const ChallengeDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  min-height: 300px;

  border: 2px solid var(--dark-primary);
  border-radius: 8px;
  background-color: var(--light-primary);
  color: var(--dark-primary);
`;

const ChallengeDetailBody = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const ChallengeDetailFooter = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const ChallengeDetailHeader = styled.div`
  padding: 20px;
  background-color: ${(props) =>
    props.solved ? "var(--positive)" : "var(--light-primary)"};
  display: flex;
  justify-content: space-between;
`;

export function ChallengeDetail({ challenge, onClose }) {
  const solved = !!challenge.solution;

  const RenderComponent = solved
    ? ChallengeDetailSolved
    : ChallengeDetailUnsolved;

  return (
    <RenderComponent challenge={challenge} onClose={onClose}></RenderComponent>
  );
}

function ChallengeDetailUnsolved({ challenge, onClose }) {
  const { session } = useSessionContext();
  const feedback = useFeedback();

  // TODO add upload widget in here and the detail body
  const needsMedia = challenge.type !== "SIMPLE";
  const media = "https://images.dog.ceo/breeds/mastiff-bull/n02108422_1548.jpg";

  const [createSolution, { loading }] = useMutation(mutations.createSolution, {
    onCompleted: (data) => {
      console.log("solved!!", data);
    },
    // TODO investigating updating our cache ourselves
    //https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    refetchQueries: [queries.teamMe],
  });

  const solveChallenge = useCallback(() => {
    createSolution({
      variables: {
        data: {
          team: { connect: session.teamId },
          challenge: { connect: challenge._id },
          media,
        },
      },
    }).then(
      () => {
        feedback.open({
          message: "solution submitted!",
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
  }, [session, challenge, media, createSolution, feedback]);

  return (
    <ChallengeDetailBox>
      <ChallengeDetailHeader solved={false}>
        <div>{challenge.name}</div>
        <div>possible score: {challenge.score}</div>
      </ChallengeDetailHeader>
      <ChallengeDetailBody>
        {/* TODO display upload widget based on challenge type */}
      </ChallengeDetailBody>
      <ChallengeDetailFooter>
        <>
          <button
            disabled={loading || (needsMedia && !media)}
            onClick={solveChallenge}
          >
            solve
          </button>
          <button disabled={loading} onClick={onClose}>
            close
          </button>
        </>
      </ChallengeDetailFooter>
    </ChallengeDetailBox>
  );
}

function ChallengeDetailSolved({ challenge, onClose }) {
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
            message: "challenge resetted!",
            mode: "SUCCESS",
          });
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
  }, [challenge, deleteSolution, feedback]);

  return (
    <ChallengeDetailBox>
      <ChallengeDetailHeader solved={true}>
        <div>{challenge.name}</div>
        <div>score: {challenge.score}</div>
      </ChallengeDetailHeader>
      <ChallengeDetailBody>
        {/* // TODO distinguish between vids and pics */}
        {challenge.solution.media && (
          <Image
            src={challenge.solution.media}
            alt="profile image"
            height={300}
            width={300}
          />
        )}
        {/* TODO display of the solution if solved, else upload widget if needed */}
      </ChallengeDetailBody>
      <ChallengeDetailFooter>
        <button disabled={loading} onClick={resetChallenge}>
          reset
        </button>
        <button onClick={onClose}>close</button>
      </ChallengeDetailFooter>
    </ChallengeDetailBox>
  );
}
