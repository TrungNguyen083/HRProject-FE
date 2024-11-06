import { gql } from "apollo-angular";

export const GET_MANAGER_QUESTION_RATING = gql`
    query GetManagerPerformanceQuestionRating($employeeId: Int!, $cycleId: Int!) {
        managerPerformanceQuestionRating(employeeId: $employeeId, cycleId: $cycleId) {
            questionId
            questionName
            questionDescription
            comment
            rating
            categoryId
        }
    }
`

export const GET_MANAGER_CATEGORY_RATING = gql`
    query GetManagerPerformanceCategoryRating($employeeId: Int!, $cycleId: Int!) {
        managerPerformanceCategoryRating(employeeId: $employeeId, cycleId: $cycleId) {
            categoryId
            categoryName
            categoryDescription
            weight
            rating
        }
    }
`

export const GET_MANAGER_OVERALL = gql`
    query GetManagerPerformanceOverall($employeeId: Int!, $cycleId: Int!) {
        managerPerformanceOverall(employeeId: $employeeId, cycleId: $cycleId) {
            evaluationCycleName
            firstName
            lastName
            profileImage
            position
            level
            rating
            status
            isSubmit
        }
    }
`