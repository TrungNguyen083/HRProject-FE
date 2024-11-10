import { gql } from "apollo-angular";

export const GET_FINAL_COMPETENCY_FORM = gql`
    query GetFinalCompetencyForm($employeeId: Int!, $cycleId: Int!) {
        finalCompetencyEvaluationForm(employeeId: $employeeId, cycleId: $cycleId) {
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

export const GET_FINAL_COMPETENCY_GROUP = gql`
    query GetFinalCompetencyGroup($employeeId: Int!, $cycleId: Int!) {
        finalCompetencyGroupRating(employeeId: $employeeId, cycleId: $cycleId) {
            id
            competencyGroupName
            weight
            rating
        }
    }
`

export const GET_FINAL_COMPETENCY_OVERALL = gql`
    query GetFinalCompetencyOverall($employeeId: Int!, $cycleId: Int!) {
        finalCompetencyOverall(employeeId: $employeeId, cycleId: $cycleId) {
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

export const CREATE_FINAL_EVALUATION = gql`
    mutation CreateFinalCompetencyEvaluation($input: CompetencyEvaluationInput!) {
        finalCompetencyEvaluation(input: $input)
    }
`