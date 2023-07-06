import { compose } from "ramda";
import { withRouter } from "next/router";
import TeamView from "../../components/team/TeamView";
import { Box } from "../../components/Styles";
import { useSessionContext } from "@/lib/session";

// TODO: this view should just render global team infos, all team things related to the team the user belongs to should go into the me route
// otherwise everyone can just grab the team._id and basically become a user of that team by navigating here
// the /me route is protected via the team code that other users dont know
function Team({ router }) {
  const { session } = useSessionContext();
  return (
    <Box>
      <TeamView
        teamId={router.query.slug}
        isMyTeam={router.query.slug === session.teamId}
      />
    </Box>
  );
}

export default compose(withRouter)(Team);
