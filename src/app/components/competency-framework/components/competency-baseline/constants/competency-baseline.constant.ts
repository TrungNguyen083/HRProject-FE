import { gql } from "apollo-angular";

export const GET_POSITION_LEVEL = gql`
query GetPositionOption($name: String!) {
  positionOption(name: $name) {
    positionId
    positionLevelName
    skillNo
  }
}
`

export const GET_COMPETENCY_BASELINE = gql`
query GetCompetencyBaseLine($positionId: Int!) {
  competencyBaseLine(positionId: $positionId) {
    verticalColumnName
    horizontalColumnName
    score
  }
}
`