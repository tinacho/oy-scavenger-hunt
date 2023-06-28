import { compose } from "ramda";
import { withRouter } from "next/router";
import Challenges from "../../components/Challenges";
import { queries, withApiData } from "../../api";

function Team({ data }) {
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div>Team:</div>
      <h1 className="text-4xl font-bold text-center">{data.team?.name}</h1>
      <div>
        <h2>Members:</h2>
        <ul>
          {data.team?.members?.map((member) => (
            <li key={member.name}>{member.name}</li>
          ))}
        </ul>
      </div>
      <Challenges />
    </div>
  );
}

export default compose(
  withRouter,
  withApiData({
    query: queries.team,
    propMapper: ({ router }) => ({ id: router.query.slug }),
  })
)(Team);
