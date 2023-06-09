// to debug stuff like api calls

import { withApiData } from "../api/withApiData";
import { useMutation } from "@apollo/client";
import { mutations, queries } from "@/api";
import { useCallback } from "react";
import { Button } from "../components/Button";
import { CHALLENGES, GAME_MASTER } from "@/lib/constants";
import { useFeedback } from "@/components/Feedback";

const deleteAll = (mutation, data) => {
  return () => {
    return Promise.all(
      data.map((s) =>
        mutation({
          variables: {
            id: s._id,
          },
        })
      )
    );
  };
};

function AdminView(props) {
  console.log(props.data);
  const feedback = useFeedback();

  const solutions = props.data.allSolutions.data;
  const challenges = props.data.allChallenges.data;
  const teams = props.data.allTeams.data;

  const [deleteSolution] = useMutation(mutations.deleteSolution);
  const [deleteChallenge] = useMutation(mutations.deleteChallenge);
  const [deleteTeam] = useMutation(mutations.deleteTeam);

  const deleteAllSolutions = deleteAll(deleteSolution, solutions);
  const deleteAllChallenges = deleteAll(deleteChallenge, challenges);
  const deleteAllTeams = deleteAll(deleteTeam, teams);

  const [createChallenge] = useMutation(mutations.createChallenge);
  const [createTeam] = useMutation(mutations.createTeam);

  const createChallenges = () => {
    return Promise.all(
      CHALLENGES.map((challenge) =>
        createChallenge({
          variables: {
            data: {
              ...challenge,
              description: "",
            },
          },
        })
      )
    );
  };

  const createGameMasterTeam = () => {
    return createTeam({
      variables: {
        data: GAME_MASTER,
      },
    });
  };

  const triggerResetSolutions = useCallback(async () => {
    if (
      confirm(
        "Are you sure you want to reset the solutions? All progress of all teams will be lost!"
      )
    ) {
      await deleteAllSolutions();

      // cant be arsed to handle all that state bs so we just reload
      window.location.href = window.location.href;
    }
  }, [deleteAllSolutions]);

  const triggerResetGame = useCallback(async () => {
    try {
      if (
        confirm(
          "Are you sure you want to reset the game? All teams together with their solutions will be reset!"
        )
      ) {
        await deleteAllSolutions();
        await deleteAllChallenges();
        await deleteAllTeams();
        await createChallenges();
        await createGameMasterTeam();

        feedback.open({
          message: "game reset done!",
          mode: "SUCCESS",
        });
        // cant be arsed to handle all that state bs so we just reload
        window.location.href = window.location.href;
      }
    } catch (e) {
      console.error(e, e.stack);
      feedback.open({ message: e.message, mode: "ERROR" });
    }
  }, [
    deleteAllSolutions,
    deleteAllChallenges,
    deleteAllTeams,
    createChallenges,
    createGameMasterTeam,
  ]);

  return (
    <div>
      <h1>Danger Zone</h1>
      <Button onClick={triggerResetSolutions} text="Reset Solutions" />
      <Button onClick={triggerResetGame} text="Reset whole game" />
    </div>
  );
}

const Admin = withApiData({ query: queries.admin })(AdminView);

export default Admin;
