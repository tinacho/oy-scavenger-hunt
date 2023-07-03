import { gql } from "@apollo/client";

// create a team with its members
// example variables:
// {
//   data: {
//     name: "Bike Gang",
//     code: "abcd",
//     members: [{ name: "Tina" }, { name: "Jan" }]
//   }
// }
export const createTeam = gql`
  mutation createTeam($data: TeamInput!) {
    createTeam(data: $data) {
      _id
      name
      code
      members {
        name
      }
    }
  }
`;

// partial update a team, use this to add more members
// example variables:
// {
// . id: "366821575551353037"
//   data: {
//     members: [{ name: "Tina" }, { name: "Jan" }]
//   }
// }
export const partialUpdateTeam = gql`
  mutation partialUpdateTeam($id: ID!, $data: PartialUpdateTeamInput!) {
    partialUpdateTeam(
      id: $id,
      data: $data
    ) {
      _id
      name
      logoSrc
      members {
        name
      }
    }
  }
`


