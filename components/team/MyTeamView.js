import { compose } from "ramda";
import { useState } from "react";
import styled from "styled-components";
import { queries, mutations, withApiData } from "../../api";
import { useMutation } from "@apollo/client";
import { getTeamScore } from "@/lib/getTeamScore";
import { PlusIcon } from "@/components/icons";
import Input from "@/components/team/Input";
import { SubmitButton } from "@/components/Button";

function MyTeamView({ data }) {
  const [inputVisible, setInputVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  console.log("data", data);

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
      <Section>
        <span>Use this code to enter the team</span>
        <Strong>{data.team.code}</Strong>
      </Section>
      <Section>
        Current score<Strong>{getTeamScore(data.team)}</Strong>
      </Section>
      <Section>
        <h2>Members</h2>
        <ul>
          {data.team.members.map((member) => (
            <li key={member.name}>
              <Strong>{member.name}</Strong>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h2>Add member to team:</h2>
        {!inputVisible && (
          <Button onClick={() => setInputVisible(true)}>
            <PlusIcon />
          </Button>
        )}
        {inputVisible && (
          <form>
            <Input
              placeholder="Member name"
              value={newMemberName}
              setter={setNewMemberName}
            />
            <SubmitButton text="Add" onClick={onSubmit} />
          </form>
        )}
        {/* TODO: add member, complete challenge etc */}
      </Section>
    </>
  );
}

const Strong = styled.strong`
  color: var(--text-accent);
  text-transform: uppercase;
  font-size: 32px;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default compose(
  withApiData({
    query: queries.teamMe,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(MyTeamView);
