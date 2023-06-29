import { compose } from "ramda";
import Challenges from "../../../components/Challenges";
import { queries, withApiData } from "../../../api";

function TeamView({ data }) {
  return (
    <>
      <div>{data.team?.name}</div>
      <div>
        <h2>Members:</h2>
        <ul>
          {data.team?.members?.map((member) => (
            <li key={member.name}>{member.name}</li>
          ))}
        </ul>
      </div>
      <Challenges />
    </>
  );
}

export default compose(
  withApiData({
    query: queries.team,
    propMapper: ({ teamId }) => ({ id: teamId }),
  })
)(TeamView);
