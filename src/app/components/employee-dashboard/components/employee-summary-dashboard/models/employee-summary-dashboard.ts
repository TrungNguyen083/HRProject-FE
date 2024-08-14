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

export interface IEmployeeAtGlanceApiResponse {
  getAtGlance: IEmployeeAtGlance;
}

export interface IEmployeeAtGlance {
  skillGapTargetScore: number;
  skillGapCurrentScore: number;
  competencyLevelPercentage: number;
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
  getOverallCompetencyScore: IEmployeeCompetencyOverallScore;
}

export interface IEmployeeCompetencyOverallScore {
  datasets: {
    lineName: string;
    datasets: number[];
  };
  labels: string[];
}
