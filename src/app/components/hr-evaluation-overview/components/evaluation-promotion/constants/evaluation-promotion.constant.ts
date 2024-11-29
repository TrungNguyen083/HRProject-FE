import { gql } from "apollo-angular";
import { TableHeader } from "src/app/models/global.model";

export const pomotionTableCols: TableHeader[] = [
    { col: 'Employee', field: 'employee' },
    { col: 'Current Position', field: 'currentPosition' },
    { col: 'Next Position', field: 'nextPosition' },
    { col: 'Status', field: 'status' },
    { col: '', field: '' },
];

export const GET_PROMOTION_PAGING = gql`
    query GetPromotionList(
        $cycleId: Int!
        $name: String
        $pageNo: Int
        $pageSize: Int
    ) {
        promotionList(
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
                currentPositionLevel
                promotePositionLevel
                status
                comment
            }
        }
    }
`

export const UPDATE_PROMOTION_REQUEST = gql`
    mutation UpdatePromotionRequest($employeeId: Int!, $cycleId: Int!, $isApprove: Boolean!, $comment: String!) {
        updatePromotionRequest(employeeId: $employeeId, cycleId: $cycleId, isApprove: $isApprove, comment: $comment)
    }
`