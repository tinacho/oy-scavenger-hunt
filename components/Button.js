import styled from "styled-components";

function Button({ text = "", ...rest }) {
  return <StyledButton {...rest}>{text}</StyledButton>;
}

function SubmitButton(props) {
  return <Button {...props} type="submit" />;
}

const StyledButton = styled.button`
  padding: 15px 25px;
  background-color: var(--light-secondary);
  color: var(--text-invert);
  border-radius: 100px;
  min-height: var(--input-height);
  &[disabled] {
    opacity: 0.7;
  }
`;

export { Button, SubmitButton };
