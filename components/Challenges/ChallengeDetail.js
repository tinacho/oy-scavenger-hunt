import styled from "styled-components";
import Image from "next/image";

const ChallengeDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  min-height: 300px;

  border: 2px solid var(--dark-primary);
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

export function ChallengeDetail({ challenge, onClose, onSolve }) {
  const solved = !!challenge.solution;

  const RenderComponent = solved
    ? ChallengeDetailSolved
    : ChallengeDetailUnsolved;

  return (
    <RenderComponent
      challenge={challenge}
      onClose={onClose}
      onSolve={onSolve}
    ></RenderComponent>
  );
}

function ChallengeDetailUnsolved({ challenge, onClose, onSolve }) {
  // TODO add upload widget in here and the detail body
  const needsMedia = challenge.type !== "SIMPLE";
  const hasMedia = false;

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
        <button disabled={needsMedia && !hasMedia}>solve</button>
        <button onClick={onClose}>close</button>
      </ChallengeDetailFooter>
    </ChallengeDetailBox>
  );
}

function ChallengeDetailSolved({ challenge, onClose }) {
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
        {/* // empty div so the close button stays on the right corner */}
        <div></div>
        <button onClick={onClose}>close</button>
      </ChallengeDetailFooter>
    </ChallengeDetailBox>
  );
}
