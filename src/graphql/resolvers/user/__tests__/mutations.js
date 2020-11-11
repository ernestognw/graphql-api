import { gql } from 'apollo-server-express';

const CREATE_USER = gql`
  mutation createUser($user: UserCreate!) {
    createUser(user: $user) {
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

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $user: UserUpdate!) {
    updateUser(id: $id, user: $user) {
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

export { CREATE_USER, UPDATE_USER };
