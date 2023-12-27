export enum EvaluationStatus {
  InProgress = 1,
  Completed = 2,
}

export interface IEmployeeEvaluationApiResponse {
  currentEvaluation: ICurrentEvaluation;
  historyEvaluation: IEvaluationHistory[];
}

export interface ICurrentEvaluation {
  competencyCycleName: string;
  status: string;
  lastUpdated: string;
}

export interface IEvaluationHistory {
  completedDate: string;
  nameOfEvaluation: string;
  status: string;
  score: number;
}
