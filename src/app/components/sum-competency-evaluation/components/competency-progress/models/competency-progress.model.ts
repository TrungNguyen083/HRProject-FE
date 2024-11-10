import { PaginatedData } from "src/app/models/global.model"

export interface ICompetencyEvaItem {
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

export interface ICompetencyEvaluationPagingParams {
    cycleId: number
    departmentId: number
    name?: string;
    pageNo?: number;
    pageSize?: number;
}

export interface ICompetencyEvaluationPagingApiResponse {
    competencyEvaluationList: PaginatedData<ICompetencyEvaItem>;
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

export interface ICompetencyEvaluationTitle {
    title: string
    status: string
    startDate: string
    dueDate: string
}

export interface ICompetencyEvaluationTitleApiResponse {
    evaluationTitle: ICompetencyEvaluationTitle
}