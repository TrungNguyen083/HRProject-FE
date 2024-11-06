import { gql } from "apollo-angular";

export const GET_PERFORMANCE_QUESTION_RATING = gql`
    query GetPerformanceQuestionRating($employeeId: Int!, $cycleId: Int!) {
        performanceQuestionRating(employeeId: $employeeId, cycleId: $cycleId) {
            questionId
            questionName
            questionDescription
            comment
            rating
            categoryId
        }
    }
`

export const GET_PERFORMANCE_CATEGORY_RATING = gql`
    query GetPerformanceCategoryRating($employeeId: Int!, $cycleId: Int!) {
        performanceCategoryRating(employeeId: $employeeId, cycleId: $cycleId) {
            categoryId
            categoryName
            categoryDescription
            weight
            rating
        }
    }
`

export const GET_PERFORMANCE_OVERALL = gql`
    query GetPerformanceOverall($employeeId: Int!, $cycleId: Int!) {
        performanceOverall(employeeId: $employeeId, cycleId: $cycleId) {
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

export const CREATE_SELF_EVALUATION = gql`
    mutation CreateSelfPerformanceEvaluation($input: PerformanceEvaluationInput!) {
        selfPerformanceEvaluation(input: $input)
    }
`