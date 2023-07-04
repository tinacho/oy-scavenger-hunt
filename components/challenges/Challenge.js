import { useState } from "react";
import styled from "styled-components";
import { ChallengeDetail } from "./ChallengeDetail";
import { CheckmarkIcon } from "../icons";

const Box = styled.div`
  width: 100%;
  aspect-ratio: 1;
  color: var(--dark-primary);
  padding: 10px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  background-color: var(--light-primary);
  display: flex;
  flex-direction: column;

  :hover {
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  word-break: break;
  overflow-wrap: break-word;
`;

const Points = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.solved ? "var(--positive-dark)" : "var(--light-secondary)"};
`;

const StyledCheckmark = styled(CheckmarkIcon)`
  width: 40px;
  height: 40px;
  color: var(--positive-dark);
  opacity: ${(props) => (props.solved ? "1" : "0")};
  margin-left: 10px;
`;

export function Challenge({ challenge, isMyTeam }) {
  const [open, setOpen] = useState(false);
  const solved = !!challenge.solution;

  return (
    <>
      <Box onClick={() => setOpen(true)} solved={solved}>
        <span>{challenge.name}</span>
        <Footer>
          <Points solved={solved}>{challenge.score}</Points>
          <StyledCheckmark solved={solved} />
        </Footer>
      </Box>
      {open && (
        <ChallengeDetail
          challenge={challenge}
          onClose={() => setOpen(false)}
          isMyTeam={isMyTeam}
        ></ChallengeDetail>
      )}
    </>
  );
}
