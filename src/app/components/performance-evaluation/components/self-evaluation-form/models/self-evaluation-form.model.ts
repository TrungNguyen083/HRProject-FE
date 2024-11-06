export interface IQuestionRating {
    questionId: number
    questionName: string
    questionDescription: string
    comment: string
    rating: number
    categoryId: number
}

export interface ICategoryRating {
    categoryId: number
    categoryName: string
    categoryDescription: string
    weight: number
    rating: number
}

export interface IPerformanceOverall {
    evaluationCycleName: string
    firstName: string
    lastName: string
    profileImage: string
    position: string
    level: string
    rating: number
    status: string
    isSubmit: boolean
}

export interface IEvaluationFormParams {
    employeeId: number
    cycleId: number
}

export interface IPerformanceOverallApiResponse {
    performanceOverall: IPerformanceOverall
}

export interface ICategoryRatingApiResponse {
    performanceCategoryRating: ICategoryRating[]
}

export interface IQuestionRatingApiResponse {
    performanceQuestionRating: IQuestionRating[]
}

export interface IPerformanceEvaluationInput {
    employeeId: number
    cycleId: number
    isSubmit: boolean
    questionRating: IQuestionSubmit[]
}

export interface IQuestionSubmit {
    questionId: number
    comment: string
    rating: number
}