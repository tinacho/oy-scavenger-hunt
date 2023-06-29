import { gql } from '@apollo/client';

export const deleteSolution = gql`
  mutation deleteSolution($id: ID!) {
    deleteSolution(id: $id) {
      _id
    }
  }
`

// create a solution of a team and challenge (connect values are _ids of the team and the challenge)
// data: {
//       team: {connect:"366821575551353037"},
//       challenge: { connect:"366821830494781644"},
//       solution: "WE DID IT LIKE THIS!!"
//       media: ["FIRST SCREENSHOT"] // those should be cloudinary urls at some point
//     }
export const createSolution = gql`
  mutation ($data: SolutionInput!) {
    createSolution(data: $data) {
      team {
        name
      }
      challenge {
        name
      }
      solution
    }
  }
`