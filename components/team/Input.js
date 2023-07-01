import styled from "styled-components";
import { withRouter } from "next/router";

function Input({ title, value, setter, type = "text", inputProps = {} }) {
  const handleChange = (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  return (
    <InputBox>
      <InputLabel>{title}</InputLabel>
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
  border: 2px solid var(--light-secondary);
  height: 48px;
  border-radius: 300px;
  padding: 0 20px;
  width: 100%;
  max-width: 500px;
`;

export default withRouter(Input);
