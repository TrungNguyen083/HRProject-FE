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

export interface IEvaluateCyclesApiResponse {
    evaluateCycles: IEvaluateCycle[];
}

export interface IEmployeeIdApiResponse {
    employeeId: number;
  }