import styled from "styled-components";
import { mutations, withApiDataMutation } from "../../../api";

function CreateNewTeam(props) {
  const { createTeam } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    // just for testing
    createTeam({
      variables: {
        data: {
          name: "123456789",
          logoSrc:
            "https://images.dog.ceo/breeds/mastiff-bull/n02108422_1548.jpg",
        },
      },
    });
  };

  return (
    <Box>
      <Title>Create team page</Title>
      <form onSubmit={onSubmit}>
        <input />
        <button type="submit">Create new team</button>
      </form>
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

export default withApiDataMutation(
  mutations.createTeam,
  "createTeam"
)(CreateNewTeam);
