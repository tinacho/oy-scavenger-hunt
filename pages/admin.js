// to debug stuff like api calls

import { withApiData } from "../api/withApiData";
import { useMutation } from "@apollo/client";
import { mutations, queries } from "@/api";
import { useCallback } from "react";
import { getTeamScore } from "@/lib/getTeamScore";
import { Button } from "../components/Button";

function MemberItem({ member }) {
  return <div>{member.name}</div>;
}

function TeamItem({ team }) {
  return (
    <tr>
      <td>{team.name}</td>
      <td>
        {team.members.map((member) => (
          <MemberItem key={member.name} member={member} />
        ))}
        add member
      </td>
      <td>{getTeamScore(team)}</td>
      <td>reset</td>
      <td>delete</td>
    </tr>
  );
}

function AdminView(props) {
  console.log(props.data);

  const solutions = props.data.allSolutions.data;

  const [deleteSolution] = useMutation(mutations.deleteSolution);

  const triggerReset = useCallback(async () => {
    if (
      confirm(
        "Are you sure you want to reset the game? All progress of all teams will be lost!"
      )
    ) {
      await Promise.all(
        solutions.map((s) =>
          deleteSolution({
            variables: {
              id: s._id,
            },
          })
        )
      );

      // cant be arsed to handle all that state bs so we just reload
      window.location.href = window.location.href;
    }
  }, [solutions, deleteSolution]);

  return (
    <div>
      <h1>Admin view</h1>
      <h2>Teams</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>members</th>
            <th>score</th>
            <th>reset score</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {props.data.allTeams.data.map((team) => (
            <TeamItem team={team} key={team._id}></TeamItem>
          ))}
        </tbody>
      </table>
      <h2>Danger Zone</h2>
      <Button onClick={triggerReset} text="Reset game" />
    </div>
  );
}

const Admin = withApiData({ query: queries.admin })(AdminView);

export default Admin;
