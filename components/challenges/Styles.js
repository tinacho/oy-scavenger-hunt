import styled from "styled-components";
import { CheckmarkIcon } from "../icons";

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  word-break: break;
  overflow-wrap: break-word;
  margin-top: auto;
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

export { Footer, Points, StyledCheckmark };
