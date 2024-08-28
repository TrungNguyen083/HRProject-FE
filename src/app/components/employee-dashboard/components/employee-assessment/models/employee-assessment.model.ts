export enum EvaluationStatus {
  InProgress = "In Progress",
  Completed = "Completed",
}

export interface IEmployeeEvaluationApiResponse {
  currentEvaluation: ICurrentEvaluation;
  historyEvaluation: IEvaluationHistory[];
}

export interface ICurrentEvaluation {
  cycleName: string;
  status: string;
  lastUpdated: string;
}

export interface IEvaluationHistory {
  completedDate: string;
  nameOfEvaluation: string;
  status: string;
  score: number;
}
