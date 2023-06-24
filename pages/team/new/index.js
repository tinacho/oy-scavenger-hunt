import { useState } from "react";
import { mutations, withApiDataMutation } from "../../../api";
import { gql } from "@apollo/client";

function CreateNewTeam(props) {
  const { createTeam } = props;

  const onSubmit = (e) => {
    e.preventDefault();
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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Create team page</h1>
      <form onSubmit={onSubmit}>
        <input />
        <button type="submit">Create new team</button>
      </form>
    </div>
  );
}

export default withApiDataMutation(
  mutations.createTeam,
  "createTeam"
)(CreateNewTeam);
// export default CreateNewTeam;
