import { compose } from "ramda";
import { withRouter } from "next/router";
import TeamView from "./components/TeamView";

function Team({ router }) {
  return <TeamView teamId={router.query.slug} />;
}

export default compose(withRouter)(Team);
