import { ICategoryRating, IPerformanceOverall, IQuestionRating } from "../../self-evaluation-form/models/self-evaluation-form.model"

export interface IManagerPerformanceOverallApiResponse {
    managerPerformanceOverall: IPerformanceOverall
}

export interface IManagerCategoryRatingApiResponse {
    managerPerformanceCategoryRating: ICategoryRating[]
}

export interface IManagerQuestionRatingApiResponse {
    managerPerformanceQuestionRating: IQuestionRating[]
}