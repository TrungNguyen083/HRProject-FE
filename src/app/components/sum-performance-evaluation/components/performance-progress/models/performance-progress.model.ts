import { PaginatedData } from "src/app/models/global.model"

export interface IPerformanceEvaItem {
    employeeId: number
    profileImage: string
    firstName: string
    lastName: string
    position: string
    level: string
    employeeStatus: string
    evaluatorStatus: string
    finalStatus: string
}

export interface IPerformanceEvaluationPagingParams {
    cycleId: number
    departmentId: number
    name?: string;
    pageNo?: number;
    pageSize?: number;
}

export interface IPerformanceEvaluationPagingApiResponse {
    performanceEvaluationList: PaginatedData<IPerformanceEvaItem>;
}

export interface ITimeline {
    timeLineName: string;
    startDate: string;
    dueDate: string;
    isDone: boolean;
}

export interface IEvaluateCycleTimelineApiResponse {
    evaluateTimeLine: ITimeline[];
}

export interface IPerformanceEvaluationTitle {
    title: string
    status: string
    startDate: string
    dueDate: string
}

export interface IPerformanceEvaluationTitleApiResponse {
    evaluationTitle: IPerformanceEvaluationTitle
}