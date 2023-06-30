import { compose } from "ramda";
import { queries, withApiData } from "../../api";

// simple team view for everyone to see (also users form other teams)
function TeamView({ data }) {
  return (
    <>
      <div>{data.team.name}</div>
      <div>
        <h2>Members:</h2>
        <ul>
          {data.team.members.map((member) => (
            <li key={member.name}>{member.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default compose(
  withApiData({
    query: queries.team,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(TeamView);
