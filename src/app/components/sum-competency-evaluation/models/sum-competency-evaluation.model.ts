export interface IDepartmentIdApiResponse {
    departmentId: number;
}

export interface IEvaluateCycle {
    id: number;
    evaluateCycleName: string;
    description: string
    startDate: string
    dueDate: string
    year: string
    status: string
    initialDate: string
}