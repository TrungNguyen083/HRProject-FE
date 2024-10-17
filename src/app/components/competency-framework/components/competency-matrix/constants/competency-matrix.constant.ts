import { gql } from "apollo-angular";

export const GET_COMPETENCY_TREE = gql`
query GetCompetencyMatrixTree {
  competencyMatrixTree {
    data {
      id
      competencyGroupName
      description
    }
    children {
      id
      competencyName
      description
      competencyGroup {
        id
        competencyGroupName
        description
      }
    }
  }
}
`;

export const GET_COMPETENCY_GROUP = gql`
query GetCompetencyGroup {
  competencyGroups {
    id
    competencyGroupName
    description
  }
}
`

export const CREATE_COMPETENCY_GROUP = gql`
mutation CreateCompetencyGroup($input: CompetencyGroupInput!) {
  createCompetencyGroup(input: $input)
}
`;

export const UPDATE_COMPETENCY_GROUP = gql`
mutation UpdateCompetencyGroup($id: Int!, $input: CompetencyGroupInput!) {
  updateCompetencyGroup(id: $id, input: $input)
}
`;

export const DELETE_COMPETENCY_GROUP = gql`
  mutation DeleteCompetencyGroup($id: Int!) {
    deleteCompetencyGroup(id: $id)
  }
`;

export const CREATE_COMPETENCY = gql`
mutation CreateCompetency($input: CompetencyInput!) {
  createCompetency(input: $input)
}
`;

export const UPDATE_COMPETENCY = gql`
mutation UpdateCompetency($id: Int!, $input: CompetencyInput!) {
  updateCompetency(id: $id, input: $input)
}
`;

export const DELETE_COMPETENCY = gql`
  mutation deleteCompetency($id: Int!) {
    deleteCompetency(id: $id)
  }
`;