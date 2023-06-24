import { gql } from "@apollo/client";

// all data needed to render the homepage view,
// teams and their solutions atm
export const home = gql`
  query home {
    allTeams {
      data {
        _id
        name
        members {
          name
        }
        logoSrc
        solutions {
          data {
            _id
            solution
            media
            challenge {
              _id
              name
              description
            }
          }
        }
      }
    }
    allChallenges {
      data {
        _id
        description
        name
        score
      }
    }
  }
`;
