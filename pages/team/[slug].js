import { compose } from "ramda";
import { withRouter } from "next/router";
import TeamView from "./components/TeamView";
import { Box } from "./components/Styles";

function Team({ router }) {
  return (
    <Box>
      <TeamView teamId={router.query.slug} />
    </Box>
  );
}

export default compose(withRouter)(Team);
