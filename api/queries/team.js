
import { gql } from '@apollo/client';

// queries team of given id and its solved challenges, queries also all available challenges
// example variables: 
// { 
// . id: "366821575551353037"
// }
export const team = gql`
  query team($id: ID!) {
    team: findTeamByID(id: $id) {
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
    allChallenges {
      data {
        _id
        name
        description
        score
      }
    }
  }
`