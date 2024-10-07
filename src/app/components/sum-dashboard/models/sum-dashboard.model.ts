import { PaginatedData } from "src/app/models/global.model";

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

export interface IDataItemDTO {
  label: string
  value: number
}

export interface IBarChartDTO {
  title: string
  items: IDataItemDTO[]
}

export interface IDiffPercentDTO {
  first: number
  second: number
  diffPercent: number
  isIncreased: boolean
}

export interface IPercentageChangeDTO {
  data: number
  diffPercent: number
  isIncreased: Boolean
}

export interface IMultiBarChartDTO {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface IPieChartDTO {
  labels: string[];
  datasets: number[];
}

export interface IRadarChartDTO {
  labels: string[];
  datasets: IRadarDatasetDTO[];
}

export interface IRadarDatasetDTO {
  lineName: string
  dataset: number[];
}

export interface IHeatMapDTO {
  verticalColumnName: string;
  horizontalColumnName: string;
  score: number;
}

export interface IReviewStatus {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  profileImg: string;
}

export interface IDepartmentEmployee {
  id: number
  firstName: string
  lastName: string
  profileImgUrl: string
}

export interface ICompetency {
  id: number
  competencyName: string
}

export interface ITopSkill {
  label: string;
  value: number;
}

export interface ITopReview {
  id: number;
  firstName: string;
  lastName: string;
  profileImgUrl?: string;
  rating: number;
}

export interface IEmployeePotentialPerformanceDTO {
  employeeId: number
  fullName: string
  profileImgUri: string
  potential: number
  performance: number
}

export interface ICycleDepartmentParams {
  cycleId: number;
  departmentId: number;
}

export interface ICompetencyGapRadarChartParams {
  cycleId: number;
  employeeIds: number[];
}

export interface IHeatMapSkillLevelParams {
  cycleId: number;
  employeeIds: number[];
  competencyIds: number[];
}

export interface ITopSkillParams {
  departmentId?: number;
  evaluateCycleId?: number;
  pageNo?: number;
  pageSize?: number;
}

export interface ITopReviewParams {
  departmentId?: number;
  cycleId?: number;
  pageNo?: number;
  pageSize?: number;
}

export interface IEvaluateCyclesApiResponse {
  evaluateCycles: IEvaluateCycle[];
}

export interface ICompetencyReviewProgressApiResponse {
  completedEvaluationByPosition: IMultiBarChartDTO
  competencyEvaluationProgressPieChart: IPieChartDTO
}

export interface IPerformanceReviewProgressApiResponse {
  completedPerformEvaluationByPosition: IMultiBarChartDTO
  performanceEvaluationProgressPieChart: IPieChartDTO
}

export interface ICompetencyReviewStatusApiResponse {
  competencyEvaluationStatus: IReviewStatus[];
}

export interface IPerformanceReviewStatusApiResponse {
  performanceEvaluationStatus: IReviewStatus[];
}

export interface ICompetencyGapRadarChartApiResponse {
  departmentCompetencyGap: IRadarChartDTO;
}

export interface IDepartmentEmployeeApiResponse {
  employeesInDepartment: IDepartmentEmployee[];
}

export interface ICompetencyApiResponse {
  competencies: ICompetency[];
}

export interface IHeatMapSkillLevelApiResponse {
  departmentSkillHeatMap: IHeatMapDTO[];
}

export interface ITopSkillApiResponse {
  topSkill: PaginatedData<ITopSkill>;
}

export interface ITopPerformerApiResponse {
  topPerformers: PaginatedData<ITopReview>;
}

export interface ITopCompetencyApiResponse {
  topCompetencyRating: PaginatedData<ITopReview>;
}

export interface IPotentialPerformanceApiResponse {
  departmentPotentialAndPerformance: IEmployeePotentialPerformanceDTO[];
}

export interface ICompetencyOverviewApiResponse {
  competencyOverviewChart: IBarChartDTO;
}

export interface IPerformanceOverviewApiResponse {
  performanceOverviewChart: IBarChartDTO;
}

export interface ICompetencyDiffApiResponse {
  competencyDiffPercent: IDiffPercentDTO
}

export interface IPerformanceDiffApiResponse {
  performanceDiffPercent: IDiffPercentDTO
}

export interface IDepartmentHeadcountApiResponse {
  departmentHeadcount: IPercentageChangeDTO
}

export interface IDepartmentHeadcountChartApiResponse {
  departmentHeadcountChart: IBarChartDTO
}