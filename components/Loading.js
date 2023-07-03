import styled from "styled-components";

export default function Loading() {
  return <Box>loading....</Box>;
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
