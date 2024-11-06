import { ICompetencyForm, ICompetencyGroup, ICompetencyOverall } from "../../evaluation-form/models/evaluation-form.model"

export interface IEmployeeFeedback {
    feedBackerProfileImage: string
    feedBackerFirstName: string
    feedBackerLastName: string
    content: string
    createdAt: string
}

export interface IManagerCompetencyOverallApiResponse {
    managerCompetencyOverall: ICompetencyOverall
}

export interface IManagerCompetencyFormApiResponse {
    managerCompetencyEvaluationForm: ICompetencyForm[]
}

export interface IManagerCompetencyGroupApiResponse {
    managerCompetencyGroupRating: ICompetencyGroup[]
}

export interface IEmployeeFeedbackApiResponse {
    employeeFeedback: IEmployeeFeedback[]
}