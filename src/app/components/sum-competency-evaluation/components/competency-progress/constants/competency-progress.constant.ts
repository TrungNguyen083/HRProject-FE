import { gql } from "apollo-angular";
import { TableHeader } from "src/app/models/global.model";

export const evaluationProgressTableCols: TableHeader[] = [
    { col: 'Employee', field: 'employee' },
    { col: 'Position', field: 'position' },
    { col: 'Employee Status', field: 'email' },
    { col: 'Manager Status', field: 'department' },
    { col: 'Final Status', field: 'currentContract' },
    { col: '', field: '' },
];

export const GET_COMPETENCY_EVALUATION_PAGING = gql`
    query GetCompetencyEvaluationList(
        $cycleId: Int!
        $departmentId: Int!
        $name: String
        $pageNo: Int
        $pageSize: Int
    ) {
        competencyEvaluationList(
            cycleId: $cycleId
            departmentId: $departmentId
            name: $name
            pageNo: $pageNo
            pageSize: $pageSize
        ) {
            pagination {
                pageNo
                pageSize
                totalItems
                totalPages
            }
            data {
                employeeId
                profileImage
                firstName
                lastName
                position
                level
                employeeStatus
                evaluatorStatus
                finalStatus
            }
        }
    }
`

export const GET_EVALUATE_TIMELINE = gql`
  query GetTimeline($evaluateCycleId: Int!) {
    evaluateTimeLine(evaluateCycleId: $evaluateCycleId) {
      timeLineName
      startDate
      dueDate
      isDone
    }
  }
`;

export const GET_COMPETENCY_EVALUATION_TITLE = gql`
query GetCompetencyEvaluationTitle($cycleId: Int!) {
  evaluationTitle(cycleId: $cycleId) {
    title
    status
    startDate
    dueDate
  }
}
`;