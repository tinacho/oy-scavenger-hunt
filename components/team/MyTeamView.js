import { compose } from "ramda";
import { queries, withApiData } from "../../api";
import { getTeamScore } from "@/lib/getTeamScore";

function MyTeamView({ data }) {
  return (
    <>
      <div>{data.team.name}</div>
      <div>Use this code to enter this team: {data.team.code}</div>
      <div>Current score: {getTeamScore(data.team)}</div>
      <div>
        <h2>Members:</h2>
        <ul>
          {data.team.members.map((member) => (
            <li key={member.name}>{member.name}</li>
          ))}
        </ul>
        {/* TODO: add member, complete challenge etc */}
      </div>
    </>
  );
}

export default compose(
  withApiData({
    query: queries.teamMe,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(MyTeamView);
