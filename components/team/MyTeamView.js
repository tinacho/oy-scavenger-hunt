import { compose } from "ramda";
import Challenges from "../Challenges";
import { queries, withApiData } from "../../api";


function MyTeamView({ data }) {
  return (
    <>
      <div>{data.team.name}</div>
      <div>Use this code to enter this team: {data.team.code}</div>
      <div>
        <h2>Members:</h2>
        <ul>
          {data.team.members.map((member) => (
            <li key={member.name}>{member.name}</li>
          ))}
        </ul>
        {/* TODO: add member, complete challenge etc */}
      </div>
      <Challenges />
    </>
  );
}

export default compose(
  withApiData({
    query: queries.teamMe,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(MyTeamView);
