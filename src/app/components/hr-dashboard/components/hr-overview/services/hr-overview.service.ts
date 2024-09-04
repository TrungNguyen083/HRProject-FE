import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { ICompetencyDiffPercentApiResponse, ICompetencyOverviewChartApiResponse, ICurrentHeadCountApiResponse, IHeadCountChartApiRespone, IHrOverviewParams, IPerformaceDiffPercentApiResponse, IPerformanceOverviewChartApiResponse } from '../models/hr-overview.model';
import { GET_COMPETENCY_DIFF_PERCENT, GET_COMPETENCY_OVERVIEW_CHART, GET_CURRENT_HEAD_COUNT, GET_HEAD_COUNT_CHART, GET_PERFORMANCE_DIFF_PERCENT, GET_PERFORMANCE_OVERVIEW_CHART } from '../constants/hr-overview.constant';

@Injectable({
  providedIn: 'root',
})
export class HrOverviewService {
  constructor(private apollo: Apollo) { }

  getCompetencyOverviewchart(
    params: IHrOverviewParams,
  ): Observable<ICompetencyOverviewChartApiResponse> {
    return this.apollo
      .watchQuery<ICompetencyOverviewChartApiResponse>({
        query: GET_COMPETENCY_OVERVIEW_CHART,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getPerformanceOverviewchart(
    params: IHrOverviewParams,
  ): Observable<IPerformanceOverviewChartApiResponse> {
    return this.apollo
      .watchQuery<IPerformanceOverviewChartApiResponse>({
        query: GET_PERFORMANCE_OVERVIEW_CHART,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCompetencyDiffPercent(
    params: IHrOverviewParams,
  ): Observable<ICompetencyDiffPercentApiResponse> {
    return this.apollo
      .watchQuery<ICompetencyDiffPercentApiResponse>({
        query: GET_COMPETENCY_DIFF_PERCENT,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getPerformanceDiffPercent(
    params: IHrOverviewParams,
  ): Observable<IPerformaceDiffPercentApiResponse> {
    return this.apollo
      .watchQuery<IPerformaceDiffPercentApiResponse>({
        query: GET_PERFORMANCE_DIFF_PERCENT,
        variables: { ...params },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCurrentHeadCount(
    cycleId: number,
  ): Observable<ICurrentHeadCountApiResponse> {
    return this.apollo
      .watchQuery<ICurrentHeadCountApiResponse>({
        query: GET_CURRENT_HEAD_COUNT,
        variables: { cycleId },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getHeadCountChart(): Observable<IHeadCountChartApiRespone> {
    return this.apollo
      .watchQuery<IHeadCountChartApiRespone>({
        query: GET_HEAD_COUNT_CHART,
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
