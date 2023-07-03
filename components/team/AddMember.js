import { useState } from "react";
import styled from "styled-components";
import { queries, mutations } from "../../api";
import { useMutation } from "@apollo/client";
import { PlusIcon } from "@/components/icons";
import Input from "@/components/team/Input";
import { SubmitButton } from "@/components/Button";

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
    <>
      {!inputVisible && (
        <Button onClick={() => setInputVisible(true)}>
          <PlusIcon />
        </Button>
      )}
      {inputVisible && (
        <form>
          <StyledInput
            placeholder="Member name"
            value={newMemberName}
            setter={setNewMemberName}
            inputProps={{
              maxLength: 20,
              minLength: 2,
              required: true,
              placeholder: "Member name",
            }}
          />
          <SubmitButton text="Add" onClick={onSubmit} />
        </form>
      )}
    </>
  );
}

const StyledInput = styled(Input)`
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: var(--text-accent);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default AddMember;
