import { IChartData, ICompareGoal, ICompareOverall, ICompareParams } from "../models/evaluation-compare.model"
import { ComponentStore, tapResponse } from "@ngrx/component-store"
import { Injectable } from "@angular/core"
import { EvaluationCompareService } from "../services/evaluation-compare.service"
import { Observable, switchMap } from "rxjs"
import { IEvaluateCycle } from "src/app/components/hr-dashboard/models/hr-dashboard.model"
import { HrDashboardService } from "src/app/components/hr-dashboard/services/hr-dashboard.service"

interface EvaluationCompareState {
    compareOverviews: ICompareOverall[]
    compareGoals: ICompareGoal[]
    compareCompetencyRadarChart: IChartData
    compareGoalPieChart: IChartData
    comparePerformanceChart: IChartData
    employeeIds: number[]
}
@Injectable({
    providedIn: 'root',
})
export class EvaluationCompareStore extends ComponentStore<EvaluationCompareState> {
    constructor(private compareService: EvaluationCompareService,
        private hrDashboardService: HrDashboardService
    ) {
        super({
            compareOverviews: [],
            compareGoals: [],
            compareCompetencyRadarChart: {
                labels: [],
                datasets: []
            },
            compareGoalPieChart: {
                labels: [],
                datasets: []
            },
            comparePerformanceChart: {
                labels: [],
                datasets: []
            },
            employeeIds: [],
        })
    }

    readonly compareOverviews$ = this.select(state => state.compareOverviews);
    readonly compareGoals$ = this.select(state => state.compareGoals);
    readonly compareCompetencyRadarChart$ = this.select(state => state.compareCompetencyRadarChart);
    readonly compareGoalPieChart$ = this.select(state => state.compareGoalPieChart);
    readonly comparePerformanceChart$ = this.select(state => state.comparePerformanceChart);
    readonly employeeIds$ = this.select(state => state.employeeIds);

    //UPDATER
    readonly setCompareOverviews = this.updater(
        (state: EvaluationCompareState, compareOverviews: ICompareOverall[]) => {
            return { ...state, compareOverviews: compareOverviews };
        },
    );

    readonly setCompareGoal = this.updater(
        (state: EvaluationCompareState, compareGoals: ICompareGoal[]) => {
            return { ...state, compareGoals: compareGoals };
        },
    );

    readonly setCompareRadarChart = this.updater(
        (state: EvaluationCompareState, compareCompetencyRadarChart: IChartData) => {
            return { ...state, compareCompetencyRadarChart: compareCompetencyRadarChart };
        },
    );

    readonly setComparePieChart = this.updater(
        (state: EvaluationCompareState, compareGoalPieChart: IChartData) => {
            return { ...state, compareGoalPieChart: compareGoalPieChart };
        },
    );

    readonly setComparePerformanceChart = this.updater(
        (state: EvaluationCompareState, comparePerformanceChart: IChartData) => {
            return { ...state, comparePerformanceChart: comparePerformanceChart };
        },
    );

    readonly setEmployeeIds = this.updater(
        (state: EvaluationCompareState, employeeIds: number[]) => {
            return { ...state, employeeIds: employeeIds };
        },
    );

    //EFFECT
    readonly getCompareOverviews = this.effect(
        (params$: Observable<ICompareParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.compareService.getCompareOverviews(params).pipe(
                        tapResponse({
                            next: res => this.setCompareOverviews(res.compareOverviews),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getCompareGoal = this.effect(
        (params$: Observable<ICompareParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.compareService.getCompareGoal(params).pipe(
                        tapResponse({
                            next: res => this.setCompareGoal(res.compareGoals),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getCompareRadarChart = this.effect(
        (params$: Observable<ICompareParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.compareService.getCompareRadarChart(params).pipe(
                        tapResponse({
                            next: res => this.setCompareRadarChart(res.compareCompetencyRadarChart),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getComparePieChart = this.effect(
        (params$: Observable<ICompareParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.compareService.getComparePieChart(params).pipe(
                        tapResponse({
                            next: res => this.setComparePieChart(res.compareGoalPieChart),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getComparePerformanceChart = this.effect(
        (params$: Observable<number[]>) =>
            params$.pipe(
                switchMap(params =>
                    this.compareService.getComparePerformanceChart(params).pipe(
                        tapResponse({
                            next: res => this.setComparePerformanceChart(res.comparePerformanceChart),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

}