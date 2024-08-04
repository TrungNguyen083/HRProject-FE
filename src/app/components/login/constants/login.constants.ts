import { gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation Login($authRequest: AuthRequest!) {
    generateToken(authRequest: $authRequest)
  }
`;
