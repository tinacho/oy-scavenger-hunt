import styled from "styled-components";
import { Challenge } from "./Challenge";

const ChallengesBox = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 3px;
  width: 100%;
`;

export function Challenges({ challenges }) {
  return (
    <ChallengesBox>
      {challenges.map((challenge) => (
        <Challenge key={challenge._id} challenge={challenge}></Challenge>
      ))}
    </ChallengesBox>
  );
}
