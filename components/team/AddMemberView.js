import styled from "styled-components";
import { PlusIcon } from "@/components/icons";
import Input from "@/components/team/Input";
import { SubmitButton } from "@/components/Button";
import { Form } from "../Styles";

function AddMemberView({
  inputVisible,
  setInputVisible,
  newMemberName,
  setNewMemberName,
  onSubmit,
  hideIcon = false,
}) {
  return (
    <>
      {!inputVisible && !hideIcon && (
        <Button onClick={() => setInputVisible(true)}>
          <PlusIcon />
        </Button>
      )}
      {(inputVisible || hideIcon) && (
        <Form onSubmit={onSubmit} id="add-member-form">
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
          <SubmitButton text="Add member" form="add-member-form" small />
        </Form>
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
  color: var(--text-invert);
  background-color: var(--light-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { AddMemberView };
