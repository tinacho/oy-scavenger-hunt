import { gql } from "@apollo/client";

export const teamMe = gql`
  query team($id: ID!) {
    team: findTeamByID(id: $id) {
      _id
      name
      code
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
    allChallenges {
      data {
        _id
        name
        description
        score
      }
    }
  }
`;

export const team = gql`
  query team($id: ID!) {
    team: findTeamByID(id: $id) {
      _id
      name
      members {
        name
      }
      logoSrc
    }
  }
`;

export const teamByCode = gql`
  query team($code: String!) {
    team: findTeamByCode(code: $code) {
      _id
      name
      code
      members {
        name
      }
  }
`;
