import styled from "styled-components";

import { Title, Box } from "@/components/Styles";

function Rules() {
  return (
    <Box>
      <Title>Rules</Title>
      <ul>
        <Item>Complete as many challenges as possible</Item>
        <Item>
          When the target of the photo is a person you don&apos;t
          <Strong> HAVE</Strong> to be in the photo, otherwise, you do.
          <br />
          <Strong>REMEMBER, PICS OR IT DIDN&apos;T HAPPEN!</Strong>
        </Item>
        <Item>
          The winner is the peron or persons with the most points at the end and
          gets <Strong>€50</Strong> and the undying respect of everyone
          involved.
        </Item>
      </ul>
    </Box>
  );
}

const Item = styled.li`
  margin-bottom: 15px;
`;

const Strong = styled.strong`
  margin-bottom: 15px;
  color: var(--text-accent);
`;

export default Rules;
