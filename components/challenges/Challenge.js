import { useState } from "react";
import styled from "styled-components";
import { ChallengeDetail } from "./ChallengeDetail";
import { Points, StyledCheckmark, Footer } from "./Styles";

export function Challenge({ challenge, isMyTeam, teamName }) {
  const [open, setOpen] = useState(false);
  const solved = !!challenge.solution;

  return (
    <>
      <Box onClick={() => setOpen(true)} solved={solved}>
        <ChallengeText>{challenge.name}</ChallengeText>
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
          teamName={teamName}
        ></ChallengeDetail>
      )}
    </>
  );
}

const Box = styled.div`
  width: 100%;
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

const ChallengeText = styled.span`
  margin-bottom: 6px;
  line-height: 1.3;
`;
