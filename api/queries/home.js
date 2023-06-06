
import { gql } from '@apollo/client';

export const home = gql`
  # teams and their solutions
  query home{
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
  }
`