import { gql } from "@apollo/client";

// all data needed to render the homepage view,
// teams and their solutions atm
export const admin = gql`
  query admin {
    allTeams {
      data {
        _id
      }
    }
    allChallenges {
      data {
        _id
      }
    }
    allSolutions {
      data {
        _id
      }
    }
  }
`;
