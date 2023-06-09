import styled from "styled-components";
import { withRouter } from "next/router";

function Input({
  title,
  value,
  setter,
  type = "text",
  inputProps = {},
  className,
}) {
  const handleChange = (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  return (
    <InputBox className={className}>
      {title && <InputLabel>{title}</InputLabel>}
      <StyledInput
        value={value}
        onChange={handleChange}
        type={type}
        {...inputProps}
      />
    </InputBox>
  );
}

const InputBox = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputLabel = styled.span`
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: var(--border-primary);
  height: var(--input-height);
  border-radius: 300px;
  padding: 0 20px;
  width: 100%;
`;

export default withRouter(Input);
