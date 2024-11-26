import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ICompareCompetencyRadarChartApiResponse, ICompareGoalApiResponse, ICompareGoalPieChartApiResponse, ICompareOverviewApiResponse, ICompareParams, IComparePerformanceChartApiResponse } from "../models/evaluation-compare.model";
import { map, Observable } from "rxjs";
import { GET_COMPARE_GOAL, GET_COMPARE_OVERVIEW, GET_COMPARE_PERFORMANCE_CHART, GET_COMPARE_PIE_CHART, GET_COMPARE_RADAR_CHART } from "../constants/evaluation-compare.constant";

@Injectable({
    providedIn: 'root',
})
export class EvaluationCompareService {
    constructor(private apollo: Apollo) { }

    getCompareOverviews(
        params: ICompareParams
    ): Observable<ICompareOverviewApiResponse> {
        return this.apollo
            .watchQuery<ICompareOverviewApiResponse>({
                query: GET_COMPARE_OVERVIEW,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompareRadarChart(
        params: ICompareParams
    ): Observable<ICompareCompetencyRadarChartApiResponse> {
        return this.apollo
            .watchQuery<ICompareCompetencyRadarChartApiResponse>({
                query: GET_COMPARE_RADAR_CHART,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompareGoal(
        params: ICompareParams
    ): Observable<ICompareGoalApiResponse> {
        return this.apollo
            .watchQuery<ICompareGoalApiResponse>({
                query: GET_COMPARE_GOAL,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getComparePieChart(
        params: ICompareParams
    ): Observable<ICompareGoalPieChartApiResponse> {
        return this.apollo
            .watchQuery<ICompareGoalPieChartApiResponse>({
                query: GET_COMPARE_PIE_CHART,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getComparePerformanceChart(
        employeeIds: number[]
    ): Observable<IComparePerformanceChartApiResponse> {
        return this.apollo
            .watchQuery<IComparePerformanceChartApiResponse>({
                query: GET_COMPARE_PERFORMANCE_CHART,
                variables: { employeeIds },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}