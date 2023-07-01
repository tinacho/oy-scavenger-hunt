import { useState } from "react";
import styled from "styled-components";
import { ChallengeDetail } from "./ChallengeDetail";

const ChallengeBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  height: 150px;
  color: var(--dark-primary);
  padding: 10px;
  word-break: break;
  overflow-wrap: break-word;
  font-size: 1rem;

  /* bit useless for mobile still nice for desktop */
  :hover {
    background-color: var(--light-secondary);
  }

  background-color: ${(props) =>
    props.solved ? "var(--positive)" : "var(--light-primary)"};
`;

export function Challenge({ challenge }) {
  const [open, setOpen] = useState(false);
  const [solved, setSolved] = useState(!!challenge.solution);

  return (
    <>
      <ChallengeBox onClick={() => setOpen(true)} solved={solved}>
        {challenge.name}
        {/* // TODO add thumbnail of the image if solved */}
      </ChallengeBox>
      {open && (
        <ChallengeDetail
          challenge={challenge}
          onClose={() => setOpen(false)}
          onSolve={setSolved}
        ></ChallengeDetail>
      )}
    </>
  );
}
