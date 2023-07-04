import styled from "styled-components";
import { Challenge } from "./Challenge";

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 5px;
  width: 100%;
  z-index: 1;
  position: relative;
`;

export function Challenges({ challenges }) {
  return (
    <Box>
      <GridBox>
        {challenges.map((challenge) => (
          <Challenge key={challenge._id} challenge={challenge}></Challenge>
        ))}
      </GridBox>
    </Box>
  );
}
