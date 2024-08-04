import { gql } from "apollo-angular";

export const REGISTER = gql`
    mutation CreateUser($authRequest: AuthRequest!) {
        createUser(authRequest: $authRequest)
    }
`