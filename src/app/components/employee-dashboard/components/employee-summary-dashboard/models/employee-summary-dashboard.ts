import { PaginatedData } from 'src/app/models/global.model';

export interface IEmployeeScoreTable {
  no: number;
  score: number;
  skillName: string;
}

export interface IEmployeeScoreParams {
  pageNo?: number;
  pageSize?: number;
  employeeId?: number;
  evaluateCycleId?: number;
}

export interface IEmployeeSkillScore {
  label: string;
  value: number;
}

export interface IEmployeeHighestSkillApiResponse {
  topSkill: PaginatedData<IEmployeeSkillScore>;
}

export interface IEmployeeImproveSkillApiResponse {
  topKeenSkillEmployee: PaginatedData<IEmployeeSkillScore>;
}
export interface IEmployeeTargetSkillApiResponse {
  topHighestSkillTargetEmployee: PaginatedData<IEmployeeSkillScore>;
}

export interface IEmployeeSkillGapBarChart {
  title: string;
  items: {
    label: string;
    value: number;
  }[]
}

export interface IEmployeeCompetencyPieChart {
  labels: string[];
  datasets: number[];
}

export interface IEmployeeSkillGapBarChartApiResponse {
  skillGapBarChart: IEmployeeSkillGapBarChart;
}

export interface ICompetencyPieChartApiResponse {
  competencyPieChart: IEmployeeCompetencyPieChart;
}

export interface IEmployeeAtGlanceParams {
  employeeId: number;
  cycleId: number;
}

export interface IEmployeePerformanceRatingApiResponse {
  employeePerformanceRatingScore: IEmployeePerformanceRating;
}

export interface IEmployeePerformanceRating {
  data: {
    label: string;
    value: number;
  }[];
}

export interface IEmployeeCompetencyOverallScoreApiResponse {
  overallCompetencyRadarChart: IEmployeeCompetencyOverallRadarChart;
}

export interface IEmployeeCompetencyOverallRadarChart {
  labels: string[];
  datasets: {
    lineName: string;
    dataset: number[];
  }[];
}

export interface IEmployeeCompetencyOverallRadarChartParams {
  employeeId?: number;
  evaluateCycleId?: number;
}
