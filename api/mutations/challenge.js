import { gql } from "@apollo/client";

export const deleteChallenge = gql`
  mutation deleteChallenge($id: ID!) {
    deleteChallenge(id: $id) {
      _id
    }
  }
`;

// example data:
// {
//   "data": {
//     "name": "Name the challenge",
//     "description": "",
//     "score": 1,
//     "type": "IMAGE"
//   }
// }
export const createChallenge = gql`
  mutation ($data: ChallengeInput!) {
    createChallenge(data: $data) {
      _id
    }
  }
`;
