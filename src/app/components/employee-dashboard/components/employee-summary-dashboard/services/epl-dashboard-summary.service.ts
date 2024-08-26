import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ICompetencyPieChartApiResponse,
  IEmployeeAtGlanceParams,
  IEmployeeCompetencyOverallScoreApiResponse as IEmployeeCompetencyOverallRadarChartApiResponse,
  IEmployeeCompetencyOverallRadarChartParams,
  IEmployeeHighestSkillApiResponse,
  IEmployeeImproveSkillApiResponse,
  IEmployeePerformanceRatingApiResponse,
  IEmployeeScoreParams,
  IEmployeeSkillGapBarChartApiResponse,
  IEmployeeTargetSkillApiResponse,
} from '../models/employee-summary-dashboard';
import { Observable, map } from 'rxjs';
import {
  GET_EMPLOYEE_COMPETENCY_PIE_CHART,
  GET_EMPLOYEE_HIGHEST_SKILL,
  GET_EMPLOYEE_IMPROVE_SKILL,
  GET_EMPLOYEE_PERFORMANCE_RATING,
  GET_EMPLOYEE_SKILL_GAP_BAR_CHART,
  GET_EMPLOYEE_TARGET_SKILL,
  GET_OVERALL_COMPETENCY_RADAR_CHART,
} from '../constants/employee-summary-dashboard.constant';

@Injectable({
  providedIn: 'root',
})
export class EmDashboardSummaryService {
  constructor(private apollo: Apollo) {}

  getEmployeeHighestSkills(
    params: IEmployeeScoreParams,
  ): Observable<IEmployeeHighestSkillApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeHighestSkillApiResponse>({
        query: GET_EMPLOYEE_HIGHEST_SKILL,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployeeTargetSkills(
    params: IEmployeeScoreParams,
  ): Observable<IEmployeeTargetSkillApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeTargetSkillApiResponse>({
        query: GET_EMPLOYEE_TARGET_SKILL,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployeeImproveSkills(
    params: IEmployeeScoreParams,
  ): Observable<IEmployeeImproveSkillApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeImproveSkillApiResponse>({
        query: GET_EMPLOYEE_IMPROVE_SKILL,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployeeCompetencyOverallRadarChart(
    params: IEmployeeCompetencyOverallRadarChartParams,
  ): Observable<IEmployeeCompetencyOverallRadarChartApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeCompetencyOverallRadarChartApiResponse>({
        query: GET_OVERALL_COMPETENCY_RADAR_CHART,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployeeSkillGapBarChart(
    params: IEmployeeAtGlanceParams,
  ): Observable<IEmployeeSkillGapBarChartApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeSkillGapBarChartApiResponse>({
        query: GET_EMPLOYEE_SKILL_GAP_BAR_CHART,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployeeCompetencyPieChart(
    params: IEmployeeAtGlanceParams,
  ): Observable<ICompetencyPieChartApiResponse> {
    return this.apollo
      .watchQuery<ICompetencyPieChartApiResponse>({
        query: GET_EMPLOYEE_COMPETENCY_PIE_CHART,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployeePerformanceRating(
    employeeId: number,
  ): Observable<IEmployeePerformanceRatingApiResponse> {
    return this.apollo
      .watchQuery<IEmployeePerformanceRatingApiResponse>({
        query: GET_EMPLOYEE_PERFORMANCE_RATING,
        variables: { employeeId },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
