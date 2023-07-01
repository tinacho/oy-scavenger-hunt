import styled from "styled-components";
import { Challenge } from "./Challenge";

const ChallengesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
