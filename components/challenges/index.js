import styled from "styled-components";
import { Challenge } from "./Challenge";

const Box = styled.div`
  display: grid;
  align-items: stretch;
  grid-template-columns: repeat(auto-fit, minmax(160px, 2fr));
  grid-gap: 2px;
  width: 100%;
  z-index: 1;
  position: relative;
  margin-top: 10px;
`;

export function Challenges({ challenges, team, editable }) {
  return (
    <Box>
      {challenges.map((challenge) => (
        <Challenge
          key={challenge._id}
          challenge={challenge}
          team={team}
          editable={editable}
        ></Challenge>
      ))}
    </Box>
  );
}
