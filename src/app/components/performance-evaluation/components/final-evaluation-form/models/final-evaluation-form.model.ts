import { ICategoryRating, IPerformanceOverall, IQuestionRating } from "../../self-evaluation-form/models/self-evaluation-form.model"

export interface IFinalPerformanceOverallApiResponse {
    finalPerformanceOverall: IPerformanceOverall
}

export interface IFinalCategoryRatingApiResponse {
    finalPerformanceCategoryRating: ICategoryRating[]
}

export interface IFinalQuestionRatingApiResponse {
    finalPerformanceQuestionRating: IQuestionRating[]
}