import { gql } from "apollo-angular";

export const GET_COMPETENCY_FORM = gql`
    query GetCompetencyForm($employeeId: Int!, $cycleId: Int!) {
        competencyEvaluationForm(employeeId: $employeeId, cycleId: $cycleId) {
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

export const GET_COMPETENCY_GROUP = gql`
    query GetCompetencyGroup($employeeId: Int!, $cycleId: Int!) {
        competencyGroupRating(employeeId: $employeeId, cycleId: $cycleId) {
            id
            competencyGroupName
            weight
            rating
        }
    }
`

export const GET_COMPETENCY_OVERALL = gql`
    query GetCompetencyOverall($employeeId: Int!, $cycleId: Int!) {
        competencyOverall(employeeId: $employeeId, cycleId: $cycleId) {
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

export const CREATE_SELF_EVALUATION = gql`
    mutation CreateSelfCompetencyEvaluation($input: CompetencyEvaluationInput!) {
        selfCompetencyEvaluation(input: $input)
    }
`