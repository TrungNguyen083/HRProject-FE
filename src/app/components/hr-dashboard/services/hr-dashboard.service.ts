import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_AVG_COMPETENCY_SCORE,
  GET_COMPETENCY_RADAR_CHART,
  GET_DEPARTMENT_COMPLETE,
  GET_EVALUATE_CYCLES,
  GET_COMPETENCY_TIMELINE as GET_EVALUATE_TIMELINE,
  GET_PERFORMANCE_BY_JOB_LEVEL,
  GET_POTENTIAL_PERFORMANCE,
  GET_TOP_COMPETENCIES,
  GET_TOP_PERFORMERS,
  GET_TOP_SKILLS,
} from '../constants/hr-dashboard.constants';
import {
  IAvgCompetencyScoreApiResponse,
  ICompetencyByLevelAndPositionParams,
  ICompetencyRadarChartApiResponse,
  ICompetencyRadarChartParams,
  ICompetencyIncompletionApiResponse,
  IEvaluateCycleTimelineApiResponse,
  IEvaluateCyclesApiResponse,
  IPerformanceByLevelApiResponse,
  IPerformanceByLevelParams,
  IPotentialPerformanceApiResponse,
  IPotentialPerformanceParams,
  ITopCompetencyApiResponse,
  ITopPerformerApiResponse,
  ITopEmployeeParams,
  ITopSkillApiResponse,
  ITopSkillParams,
} from '../models/hr-dashboard.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HrDashboardService {
  constructor(private apollo: Apollo) {}

  getTopPerformers(
    params: ITopEmployeeParams,
  ): Observable<ITopPerformerApiResponse> {
    return this.apollo
      .watchQuery<ITopPerformerApiResponse>({
        query: GET_TOP_PERFORMERS,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTopSkills(
    params: ITopSkillParams,
  ): Observable<ITopSkillApiResponse> {
    return this.apollo
      .watchQuery<ITopSkillApiResponse>({
        query: GET_TOP_SKILLS,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCompetencyCompletionStatus(
    evaluateCycleId: number,
  ): Observable<ICompetencyIncompletionApiResponse> {
    return this.apollo
      .watchQuery<ICompetencyIncompletionApiResponse>({
        query: GET_DEPARTMENT_COMPLETE,
        variables: { evaluateCycleId },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCompetencyByLevelAndPosition(
    params: ICompetencyByLevelAndPositionParams,
  ): Observable<IAvgCompetencyScoreApiResponse> {
    return this.apollo
      .watchQuery<IAvgCompetencyScoreApiResponse>({
        query: GET_AVG_COMPETENCY_SCORE,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCompetencyRadarChart(
    params: ICompetencyRadarChartParams,
  ): Observable<ICompetencyRadarChartApiResponse> {
    return this.apollo
      .watchQuery<ICompetencyRadarChartApiResponse>({
        query: GET_COMPETENCY_RADAR_CHART,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEvaluateTimeline(
    evaluateCycleId: number,
  ): Observable<IEvaluateCycleTimelineApiResponse> {
    return this.apollo
      .watchQuery<IEvaluateCycleTimelineApiResponse>({
        query: GET_EVALUATE_TIMELINE,
        variables: { evaluateCycleId },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEvaluateCycles(): Observable<IEvaluateCyclesApiResponse> {
    return this.apollo
      .watchQuery<IEvaluateCyclesApiResponse>({
        query: GET_EVALUATE_CYCLES,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTopCompetencies(
    params: ITopEmployeeParams,
  ): Observable<ITopCompetencyApiResponse> {
    return this.apollo
      .watchQuery<ITopCompetencyApiResponse>({
        query: GET_TOP_COMPETENCIES,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getPotentialPerformance(
    params: IPotentialPerformanceParams,
  ): Observable<IPotentialPerformanceApiResponse> {
    return this.apollo
      .watchQuery<IPotentialPerformanceApiResponse>({
        query: GET_POTENTIAL_PERFORMANCE,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getPerformanceByLevel(
    params: IPerformanceByLevelParams,
  ): Observable<IPerformanceByLevelApiResponse> {
    return this.apollo
      .watchQuery<IPerformanceByLevelApiResponse>({
        query: GET_PERFORMANCE_BY_JOB_LEVEL,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
