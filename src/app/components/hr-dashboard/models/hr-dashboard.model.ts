import { PaginatedData } from 'src/app/models/global.model';
import {
  IEmployee,
  IJobLevel,
} from '../../employee-management/models/employee-management.model';


export interface ICompetencyIncompletionStatus {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface ICompanyCompletion {
  labels: string[];
  datasets: number[];
}
export interface ICompetencyIncompletionApiResponse {
  departmentInCompleteComp: ICompetencyIncompletionStatus;
  competencyEvalProgress: ICompanyCompletion;
}

export interface ICompetencyByLevelAndPositionParams {
  positionId?: number;
  evaluateCycleId?: number;
}
export interface IAvgCompetencyScore {
  verticalColumnName: string;
  horizontalColumnName: string;
  score: number;
}
export interface IAvgCompetencyScoreApiResponse {
  avgCompetencyScore: IAvgCompetencyScore[];
}

export interface ICompetencyRadarChartParams {
  evaluateCycleIds: number[];
  departmentId: number;
}

export interface ICompetencyRadarChartApiResponse {
  competencyRadarChart: ICompetencyRadarChart;
}
export interface ICompetencyRadarChart {
  labels: string[];
  datasets: {
    lineName: string;
    dataset: number[];
  }[];
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

export interface ITopSkill {
  label: string;
  value: number;
}
export interface ITopSkillParams {
  pageNo?: number;
  pageSize?: number;
  evaluateCycleId?: number;
}
export interface ITopSkillApiResponse {
  topSkill: PaginatedData<ITopSkill>;
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

export interface IEvaluateCyclesApiResponse {
  evaluateCycles: IEvaluateCycle[];
}


export interface ITopEmployeeParams {
  cycleId?: number;
  pageNo?: number;
  pageSize?: number;
}

export interface ITopEmployee {
  id: number;
  firstName: string;
  lastName: string;
  profileImgUrl?: string;
  rating: number;
}

export interface ITopPerformerApiResponse {
  topPerformers: PaginatedData<ITopEmployee>;
}


export interface ITopCompetencyApiResponse {
  topCompetencyRating: PaginatedData<ITopEmployee>;
}

export interface IPotentialPerformance {
  employeeId: number;
  fullName: string;
  profileImgUri: string;
  potential: number;
  performance: number;
}

export interface IPotentialPerformanceParams {
  departmentId: number;
  cycleId: number;
}

export interface IPotentialPerformanceApiResponse {
  employeesPotentialPerformance: IPotentialPerformance[];
}

export interface IPerformanceByLevelParams {
  positionId: number;
  cycleId: number;
}

export interface IPerformanceByLevel {
  labels: IJobLevel[];
  datasets: {
    tag: string;
    data: number[];
  }[]
}
export interface IPerformanceByLevelApiResponse {
  performanceByJobLevel: IPerformanceByLevel;
}
