import { gql } from 'apollo-angular';

export const GET_TEMPLATE = gql`
  query GetTemplates {
    templates {
        templateName
        templateDescription
        createdAt
        createdBy
    }
  }
`;