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
  competencyCycleId?: number;
}
export interface IAvgCompetencyScore {
  verticalColumnName: string;
  horizontalColumnName: string;
  score: number;
}
export interface IAvgCompetencyScoreApiResponse {
  avgCompetencyScore: IAvgCompetencyScore[];
}

export interface ICompetencyByUnitParams {
  competencyCyclesId: number[];
  departmentId: number;
}

export interface ICompetencyByUnitApiResponse {
  competencyRadarChart: ICompetencyByUnit;
}
export interface ICompetencyByUnit {
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

export interface ICompetencyTimelineApiResponse {
  competencyTimeLine: ITimeline[];
}

export interface ITopSkillset {
  label: string;
  value: number;
}
export interface ITopskillsetParams {
  pageNo?: number;
  pageSize?: number;
  competencyCycleId?: number;
}
export interface ITopSkillsetApiResponse {
  topSkillSet: PaginatedData<ITopSkillset>;
}

export interface ICompetencyCycle {
  id: number;
  competencyCycleName: string;
}
export interface ICptCyclesApiResponse {
  competencyCycles: ICompetencyCycle[];
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
