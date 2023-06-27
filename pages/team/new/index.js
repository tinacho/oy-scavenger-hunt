import styled from "styled-components";
import { useState } from "react";
import { mutations, withApiDataMutation } from "../../../api";

function CreateNewTeam(props) {
  const [name, setName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const { createTeam } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    createTeam({
      variables: {
        data: {
          name,
          logoSrc,
        },
      },
    });
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleLogoChange = (e) => {
    e.preventDefault();
    setLogoSrc(e.target.value);
  };

  return (
    <Box>
      <Title>Create new team</Title>
      <Form onSubmit={onSubmit}>
        <InputBox>
          <Input value={name} onChange={handleNameChange} type="text" />
        </InputBox>
        <InputBox>
          <Input value={logoSrc} onChange={handleLogoChange} type="url" />
        </InputBox>
        <button type="submit" disabled={!(name && logoSrc)}>
          Create new team
        </button>
      </Form>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px;
`;

const Title = styled.h1`
  padding: 15px 25px;
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
`;

const InputBox = styled.div`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: transparent;
  border: 2px solid var(--light-secondary);
  height: 48px;
  border-radius: 300px;
  padding: 0 20px;
`;

export default withApiDataMutation(
  mutations.createTeam,
  "createTeam"
)(CreateNewTeam);
