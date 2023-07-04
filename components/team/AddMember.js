import { useState } from "react";
import { queries, mutations } from "../../api";
import { useMutation } from "@apollo/client";
import { AddMemberView } from "./AddMemberView";

function AddMember({ data }) {
  const [inputVisible, setInputVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  const [addMember] = useMutation(mutations.partialUpdateTeam, {
    onCompleted: (data) => {
      console.log("updated!!", data);
      resetState();
    },
    // TODO investigating updating our cache ourselves
    //https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    refetchQueries: [queries.teamMe],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addMember({
      variables: {
        id: data.team._id,
        data: {
          members: [
            ...data.team.members.map((member) => ({ name: member.name })),
            { name: newMemberName },
          ],
        },
      },
    });
  };

  const resetState = () => {
    setInputVisible(false);
    setNewMemberName("");
  };

  return (
    <AddMemberView
      inputVisible={inputVisible}
      setInputVisible={setInputVisible}
      newMemberName={newMemberName}
      setNewMemberName={setNewMemberName}
      onSubmit={onSubmit}
    />
  );
}

export { AddMember };
