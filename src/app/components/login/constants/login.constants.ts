import { gql } from 'apollo-angular';

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    generateToken(username: $username, password: $password)
  }
`;
