import { PaginatedData } from 'src/app/models/global.model';

export interface IEmployeeScoreTable {
  no: number;
  score: number;
  skillsetName: string;
}

export interface IEmployeeScoreParams {
  pageNo?: number;
  pageSize?: number;
  employeeId?: number;
}

export interface IEmployeeSkillScore {
  skillSet: {
    skillSetName: string;
  };
  proficiencyLevel: {
    score: number;
  };
}

export interface IEmployeeHighestSkillApiResponse {
  topHighestSkillSetEmployee: PaginatedData<IEmployeeSkillScore>;
}

export interface IEmployeeImproveSkillApiResponse {
  topKeenSkillSetEmployee: PaginatedData<IEmployeeSkillScore>;
}
export interface IEmployeeTargetSkillApiResponse {
  topHighestSkillSetTargetEmployee: PaginatedData<IEmployeeSkillScore>;
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
    score: number;
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
