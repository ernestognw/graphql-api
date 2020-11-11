import { gql } from 'apollo-server-express';

const GET_USERS = gql`
  query users($params: QueryParams) {
    users(params: $params) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        firstName
        lastName
        email
        profileImg
        createdAt
        updatedAt
      }
    }
  }
`;

const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      profileImg
      createdAt
      updatedAt
    }
  }
`;

export { GET_USERS, GET_USER };
