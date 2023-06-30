
import { gql } from '@apollo/client';

// all data needed to render the homepage view, 
// teams and their solutions atm
export const admin = gql`
  query admin{
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
              score
            }
          }
        }
      }
    }
    allChallenges {
      data {
        _id
        name
        description
      }
    }
    allSolutions {
      data {
        _id
      }
    }
  }
`