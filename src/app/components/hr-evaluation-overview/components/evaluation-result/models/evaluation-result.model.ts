import { PaginatedData } from "src/app/models/global.model"

export interface IEvaluationResult {
    employeeId: number
    profileImage: string
    firstName: string
    lastName: string
    position: string
    level: string
    competencyRating: number
    performanceRating: number
    potential: string
    finalStatus: string
}

export interface IEvaluationResultParams {
    cycleId: number
    name?: string;
    pageNo?: number;
    pageSize?: number;
}

export interface IEvaluationResultPagingApiResponse {
    evaluationOverviewList: PaginatedData<IEvaluationResult>;
}

export interface IEvaluationResultTitle {
    title: string
    status: string
    startDate: string
    dueDate: string
}

export interface IEvaluationResultTitleApiResponse {
    evaluationTitle: IEvaluationResultTitle
}