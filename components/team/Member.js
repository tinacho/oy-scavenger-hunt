import { Strong, MemberItem } from "./Styles";
import { useState } from "react";
import { queries, mutations } from "../../api";
import { useMutation } from "@apollo/client";

function Member({ data, name }) {
  const [removeMember] = useMutation(mutations.partialUpdateTeam, {
    onCompleted: (data) => {
      console.log("updated", data);
    },
    refetchQueries: [queries.teamMe],
  });

  const onRemoveMember = () => {
    console.log("remove name", name);
    const newMembers = data.team.members.filter(
      (member) => member.name !== name
    );
    console.log("newMembers", newMembers);
    removeMember({
      variables: {
        id: data.team._id,
        data: {
          members: [...newMembers.map((member) => ({ name: member.name }))],
        },
      },
    });
  };

  const [removeBtn, setRemoveBtn] = useState(false);

  const onClick = () => {
    setRemoveBtn(!removeBtn);
  };

  return (
    <MemberItem onClick={onClick}>
      <Strong>{name}</Strong>{" "}
      {removeBtn && <button onClick={onRemoveMember}>X</button>}
    </MemberItem>
  );
}

export default Member;
