import { gql } from "apollo-angular";

export const GET_FINAL_QUESTION_RATING = gql`
    query GetFinalPerformanceQuestionRating($employeeId: Int!, $cycleId: Int!) {
        finalPerformanceQuestionRating(employeeId: $employeeId, cycleId: $cycleId) {
            questionId
            questionName
            questionDescription
            comment
            rating
            categoryId
        }
    }
`

export const GET_FINAL_CATEGORY_RATING = gql`
    query GetFinalPerformanceCategoryRating($employeeId: Int!, $cycleId: Int!) {
        finalPerformanceCategoryRating(employeeId: $employeeId, cycleId: $cycleId) {
            categoryId
            categoryName
            categoryDescription
            weight
            rating
        }
    }
`

export const GET_FINAL_OVERALL = gql`
    query GetFinalPerformanceOverall($employeeId: Int!, $cycleId: Int!) {
        finalPerformanceOverall(employeeId: $employeeId, cycleId: $cycleId) {
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