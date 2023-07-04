import { useState } from "react";
import styled from "styled-components";
import { ChallengeDetail } from "./ChallengeDetail";

const ChallengeBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  color: var(--dark-primary);
  padding: 10px;
  word-break: break;
  overflow-wrap: break-word;
  font-size: 16px;
  text-align: left;
  border: 5px solid transparent;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }

  background-color: ${(props) =>
    props.solved ? "var(--positive)" : "var(--light-primary)"};
`;

export function Challenge({ challenge }) {
  const [open, setOpen] = useState(false);
  const solved = !!challenge.solution;

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
        ></ChallengeDetail>
      )}
    </>
  );
}
