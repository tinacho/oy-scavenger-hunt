import { compose } from "ramda";
import { withRouter } from "next/router";
import TeamView from "./components/TeamView";
import { Box, Title } from "./components/Styles";

function Team({ router }) {
  return (
    <Box>
      <Title>Team</Title>
      <TeamView teamId={router.query.slug} />
    </Box>
  );
}

export default compose(withRouter)(Team);
