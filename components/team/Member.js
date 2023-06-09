import styled from "styled-components";
import { Strong, MemberItem } from "../Styles";
import { useState } from "react";
import { queries, mutations } from "../../api";
import { useMutation } from "@apollo/client";
import { CloseIcon } from "../icons";

function Member({ data, name, isMyTeam }) {
  const [removeMember] = useMutation(mutations.partialUpdateTeam, {
    onCompleted: (data) => {
      console.log("updated", data);
    },
    refetchQueries: [queries.teamMe],
  });

  const onRemoveMember = () => {
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
    <StyledMemberItem onClick={onClick}>
      <Strong>{name}</Strong>{" "}
      {removeBtn && isMyTeam && (
        <Button onClick={onRemoveMember} small>
          <StyledIcon />
        </Button>
      )}
    </StyledMemberItem>
  );
}

const Button = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  color: var(--text-invert);
  background-color: var(--light-secondary);
}`;

const StyledIcon = styled(CloseIcon)`
  width: 22px;
  height: 22px;
}`;

const StyledMemberItem = styled(MemberItem)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Member;
