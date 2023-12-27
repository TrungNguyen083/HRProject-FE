import { gql } from 'apollo-angular';

export const evaluationHistoryTableCol = [
  { col: 'Completion Date', field: 'completionDate' },
  { col: 'Name of evaluation', field: 'name' },
  { col: 'Status', field: 'status' },
  { col: 'Score', field: 'score' },
];

export const GET_EMPPLOYEE_EVALUATION = gql`
  query GetEmployeeEvaluation($employeeId: Int!) {
    currentEvaluation(employeeId: $employeeId) {
      competencyCycleName
      status
      lastUpdated
    }
    historyEvaluation(employeeId: $employeeId) {
      completedDate
      nameOfEvaluation
      status
      score
    }
  }
`;
