import { gql } from "apollo-angular";
import { TableHeader } from "src/app/models/global.model";

export const evaluationProgressTableCols: TableHeader[] = [
    { col: 'Employee', field: 'employee' },
    { col: 'Position', field: 'position' },
    { col: 'Competency', field: 'competencyRating' },
    { col: 'Performance', field: 'performanceRating' },
    { col: 'Potential', field: 'potential' },
    { col: '', field: '' },
];

export const GET_EVALUATION_RESULT_PAGING = gql`
    query GetEvaluationOverviewList(
        $cycleId: Int!
        $name: String
        $pageNo: Int
        $pageSize: Int
    ) {
        evaluationOverviewList(
            cycleId: $cycleId
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
                competencyRating
                performanceRating
                potential
                finalStatus
            }
        }
    }
`
export const GET_EVALUATION_RESULT_TITLE = gql`
query GetEvaluationTitle($cycleId: Int!) {
  evaluationTitle(cycleId: $cycleId) {
    title
    status
    startDate
    dueDate
  }
}
`;

export const CREATE_REQUEST_PROMOTION = gql`
    mutation createRequestPromotion($employeeIds: [Int!], $cycleId: Int) {
        requestPromotion(employeeIds: $employeeIds, cycleId: $cycleId)
    }
`