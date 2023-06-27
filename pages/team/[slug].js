import { useRouter } from "next/router";
import { compose } from "ramda";
import Challenges from "../../components/Challenges";
import { withRouter } from "../../components/withRouter";
import { queries, withApiData } from "../../api";

function Team({ data }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Team:</div>
      <h1 className="text-4xl font-bold text-center">{data.team?.name}</h1>
      <div>
        <h2>Members:</h2>
        <ul>
          <li>Member 1</li>
          <li>Member 2</li>
          <li>Member 3</li>
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
