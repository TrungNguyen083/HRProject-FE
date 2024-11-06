import { ICompetencyForm, ICompetencyGroup, ICompetencyOverall } from "../../evaluation-form/models/evaluation-form.model"

export interface IFinalCompetencyOverallApiResponse {
    finalCompetencyOverall: ICompetencyOverall
}

export interface IFinalCompetencyFormApiResponse {
    finalCompetencyEvaluationForm: ICompetencyForm[]
}

export interface IFinalCompetencyGroupApiResponse {
    finalCompetencyGroupRating: ICompetencyGroup[]
}