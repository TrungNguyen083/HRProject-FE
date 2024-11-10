import { gql } from "apollo-angular";

export const GET_MANAGER_COMPETENCY_FORM = gql`
    query GetManagerCompetencyForm($employeeId: Int!, $cycleId: Int!) {
        managerCompetencyEvaluationForm(employeeId: $employeeId, cycleId: $cycleId) {
            competency {
                id
                competencyName
                comment
                rating
            }
            skills {
                id
                skillName
            }
            competencyGroupId
        }
    }
`

export const GET_MANAGER_COMPETENCY_GROUP = gql`
    query GetManagerCompetencyGroup($employeeId: Int!, $cycleId: Int!) {
        managerCompetencyGroupRating(employeeId: $employeeId, cycleId: $cycleId) {
            id
            competencyGroupName
            weight
            rating
        }
    }
`

export const GET_MANAGER_COMPETENCY_OVERALL = gql`
    query GetManagerCompetencyOverall($employeeId: Int!, $cycleId: Int!) {
        managerCompetencyOverall(employeeId: $employeeId, cycleId: $cycleId) {
            employeeId
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

export const GET_EMPLOYEE_FEEDBACK = gql`
query GetEmployeeFeedback($employeeId: Int!, $cycleId: Int!) {
    employeeFeedback(employeeId: $employeeId, cycleId: $cycleId) {
        feedBackerProfileImage
        feedBackerFirstName
        feedBackerLastName
        content
        createdAt
    }
}
`

export const CREATE_MANAGER_EVALUATION = gql`
    mutation CreateManagerCompetencyEvaluation($input: CompetencyEvaluationInput!) {
        managerCompetencyEvaluation(input: $input)
    }
`