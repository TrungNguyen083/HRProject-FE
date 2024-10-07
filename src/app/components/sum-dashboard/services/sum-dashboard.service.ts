import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, map } from "rxjs";
import { GET_COMPETENCIES, GET_COMPETENCY_DIFF, GET_COMPETENCY_GAP_RADAR_CHART, GET_COMPETENCY_OVERVIEW, GET_COMPETENCY_REVIEW_PROGRESS, GET_COMPETENCY_STATUS, GET_DEPARTMENT_EMPLOYEE, GET_DEPARTMENT_HEADCOUNT, GET_DEPARTMENT_HEADCOUNT_CHART, GET_DEPARTMENT_ID, GET_EVALUATE_CYCLES, GET_HEAT_MAP_SKILL_LEVEL, GET_PERFORMANCE_DIFF, GET_PERFORMANCE_OVERVIEW, GET_PERFORMANCE_REVIEW_PROGRESS, GET_PERFORMANCE_STATUS, GET_POTENTIAL_PERFORMANCE, GET_TOP_COMPETENCIES, GET_TOP_PERFORMERS, GET_TOP_SKILLS } from "../constants/sum-dashbaord.constant";
import { ICompetencyApiResponse, ICompetencyDiffApiResponse, ICompetencyGapRadarChartApiResponse, ICompetencyGapRadarChartParams, ICompetencyOverviewApiResponse, ICompetencyReviewProgressApiResponse, ICompetencyReviewStatusApiResponse, ICycleDepartmentParams, IDepartmentEmployeeApiResponse, IDepartmentHeadcountApiResponse, IDepartmentHeadcountChartApiResponse, IDepartmentIdApiResponse, IEvaluateCyclesApiResponse, IHeatMapSkillLevelApiResponse, IHeatMapSkillLevelParams, IPerformanceDiffApiResponse, IPerformanceOverviewApiResponse, IPerformanceReviewProgressApiResponse, IPerformanceReviewStatusApiResponse, IPotentialPerformanceApiResponse, ITopCompetencyApiResponse, ITopPerformerApiResponse, ITopReviewParams, ITopSkillApiResponse, ITopSkillParams } from "../models/sum-dashboard.model";

@Injectable({
    providedIn: 'root',
})
export class SumDashboardService {
    constructor(private apollo: Apollo) { }

    getDepartmentId(email: string): Observable<IDepartmentIdApiResponse> {
        return this.apollo
            .watchQuery<IDepartmentIdApiResponse>({
                query: GET_DEPARTMENT_ID,
                variables: { email },
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

    getCompetencyReviewProgress(
        params: ICycleDepartmentParams
    ): Observable<ICompetencyReviewProgressApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyReviewProgressApiResponse>({
                query: GET_COMPETENCY_REVIEW_PROGRESS,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getPerformanceReviewProgress(
        params: ICycleDepartmentParams
    ): Observable<IPerformanceReviewProgressApiResponse> {
        return this.apollo
            .watchQuery<IPerformanceReviewProgressApiResponse>({
                query: GET_PERFORMANCE_REVIEW_PROGRESS,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyReviewStatus(
        params: ICycleDepartmentParams
    ): Observable<ICompetencyReviewStatusApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyReviewStatusApiResponse>({
                query: GET_COMPETENCY_STATUS,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getPerformanceReviewStatus(
        params: ICycleDepartmentParams
    ): Observable<IPerformanceReviewStatusApiResponse> {
        return this.apollo
            .watchQuery<IPerformanceReviewStatusApiResponse>({
                query: GET_PERFORMANCE_STATUS,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getDepartmentEmployee(
        departmentId: number
    ): Observable<IDepartmentEmployeeApiResponse> {
        return this.apollo
            .watchQuery<IDepartmentEmployeeApiResponse>({
                query: GET_DEPARTMENT_EMPLOYEE,
                variables: { departmentId },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyGapRadarChart(
        params: ICompetencyGapRadarChartParams
    ): Observable<ICompetencyGapRadarChartApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyGapRadarChartApiResponse>({
                query: GET_COMPETENCY_GAP_RADAR_CHART,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencies(): Observable<ICompetencyApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyApiResponse>({
                query: GET_COMPETENCIES,
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getHeatMapSkillLevel(
        params: IHeatMapSkillLevelParams
    ): Observable<IHeatMapSkillLevelApiResponse> {
        return this.apollo
            .watchQuery<IHeatMapSkillLevelApiResponse>({
                query: GET_HEAT_MAP_SKILL_LEVEL,
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

    getTopCompetencies(
        params: ITopReviewParams,
    ): Observable<ITopCompetencyApiResponse> {
        return this.apollo
            .watchQuery<ITopCompetencyApiResponse>({
                query: GET_TOP_COMPETENCIES,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getTopPerformers(
        params: ITopReviewParams,
    ): Observable<ITopPerformerApiResponse> {
        return this.apollo
            .watchQuery<ITopPerformerApiResponse>({
                query: GET_TOP_PERFORMERS,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getPotentialPerformance(
        params: ICycleDepartmentParams
    ): Observable<IPotentialPerformanceApiResponse> {
        return this.apollo
            .watchQuery<IPotentialPerformanceApiResponse>({
                query: GET_POTENTIAL_PERFORMANCE,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyOverview(
        params: ICycleDepartmentParams
    ): Observable<ICompetencyOverviewApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyOverviewApiResponse>({
                query: GET_COMPETENCY_OVERVIEW,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getPerformanceOverview(
        params: ICycleDepartmentParams
    ): Observable<IPerformanceOverviewApiResponse> {
        return this.apollo
            .watchQuery<IPerformanceOverviewApiResponse>({
                query: GET_PERFORMANCE_OVERVIEW,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyDiff(
        params: ICycleDepartmentParams
    ): Observable<ICompetencyDiffApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyDiffApiResponse>({
                query: GET_COMPETENCY_DIFF,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getPerformanceDiff(
        params: ICycleDepartmentParams
    ): Observable<IPerformanceDiffApiResponse> {
        return this.apollo
            .watchQuery<IPerformanceDiffApiResponse>({
                query: GET_PERFORMANCE_DIFF,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getDepartmentHeadcount(
        params: ICycleDepartmentParams
    ): Observable<IDepartmentHeadcountApiResponse> {
        return this.apollo
            .watchQuery<IDepartmentHeadcountApiResponse>({
                query: GET_DEPARTMENT_HEADCOUNT,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getDepartmentHeadcountChart(
        departmentId: number
    ): Observable<IDepartmentHeadcountChartApiResponse> {
        return this.apollo
            .watchQuery<IDepartmentHeadcountChartApiResponse>({
                query: GET_DEPARTMENT_HEADCOUNT_CHART,
                variables: { departmentId },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}