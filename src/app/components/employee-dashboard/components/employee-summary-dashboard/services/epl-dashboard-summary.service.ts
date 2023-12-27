import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  IEmployeeAtGlanceApiResponse,
  IEmployeeCompetencyOverallScoreApiResponse,
  IEmployeeHighestSkillApiResponse,
  IEmployeeImproveSkillApiResponse,
  IEmployeePerformanceRatingApiResponse,
  IEmployeeScoreParams,
  IEmployeeTargetSkillApiResponse,
} from '../models/employee-summary-dashboard';
import { Observable, map } from 'rxjs';
import {
  GET_EMPLOYEE_AT_GLANCE,
  GET_EMPLOYEE_HIGHEST_SKILL,
  GET_EMPLOYEE_IMPROVE_SKILL,
  GET_EMPLOYEE_PERFORMANCE_RATING,
  GET_EMPLOYEE_TARGET_SKILL,
  GET_OVERALL_COMPETENCY_SCORE,
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

  getEmployeeAtGlance(
    employeeId: number,
  ): Observable<IEmployeeAtGlanceApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeAtGlanceApiResponse>({
        query: GET_EMPLOYEE_AT_GLANCE,
        variables: { employeeId },
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

  getEmployeeCompetencyOverallScore(
    employeeId: number,
  ): Observable<IEmployeeCompetencyOverallScoreApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeCompetencyOverallScoreApiResponse>({
        query: GET_OVERALL_COMPETENCY_SCORE,
        variables: { employeeId },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
