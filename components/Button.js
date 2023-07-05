import { StyledButton } from "./Styles";

function Button({ text = "", ...rest }) {
  return <StyledButton {...rest}>{text}</StyledButton>;
}

function SubmitButton(props) {
  return <Button {...props} type="submit" />;
}

export { Button, SubmitButton };
