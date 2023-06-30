
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
            media
            challenge {
              _id
              name
              description
              score
              type
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
        type
      }
    }
    allSolutions {
      data {
        _id
      }
    }
  }
`