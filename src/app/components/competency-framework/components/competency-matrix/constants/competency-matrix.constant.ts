import { gql } from "apollo-angular";

export const GET_COMPETENCY_TREE = gql`
query GetCompetencyMatrixTree {
  competencyMatrixTree {
    data
    children
  }
}
`;

