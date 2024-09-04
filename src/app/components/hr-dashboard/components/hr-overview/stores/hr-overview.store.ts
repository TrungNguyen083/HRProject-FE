import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { IBarChartDTO, IDiffPercentDTO, IHrOverviewParams, IPercentageChangeDTO } from '../models/hr-overview.model';
import { HrOverviewService } from '../services/hr-overview.service';
import { Observable, switchMap } from 'rxjs';

interface IHrOverviewState {
    competencyOverviewChart: IBarChartDTO | null;
    competencyDiffPercent: IDiffPercentDTO | null;
    performanceOverviewChart: IBarChartDTO | null;
    performanceDiffPercent: IDiffPercentDTO | null;
    currentHeadcounts: IPercentageChangeDTO | null;
    headcountChart: IBarChartDTO | null;
}

@Injectable({
    providedIn: 'root'
})
export class HrOverviewStore extends ComponentStore<IHrOverviewState> {
    constructor(private hrOverviewService: HrOverviewService) {
        super({
            competencyOverviewChart: null,
            performanceOverviewChart: null,
            competencyDiffPercent: null,
            performanceDiffPercent: null,
            currentHeadcounts: null,
            headcountChart: null
        })
    }

    //SELECTOR
    readonly competencyOverviewChart$ = this.select(state => state.competencyOverviewChart);
    readonly performanceOverviewChart$ = this.select(state => state.performanceOverviewChart);
    readonly competencyDiffPercent$ = this.select(state => state.competencyDiffPercent);
    readonly performanceDiffPercent$ = this.select(state => state.performanceDiffPercent);
    readonly currentHeadcounts$ = this.select(state => state.currentHeadcounts);
    readonly headcountChart$ = this.select(state => state.headcountChart);


    //UPDATER
    readonly setCompetencyOverviewChart = this.updater(
        (
            state: IHrOverviewState,
            competencyOverviewChart: IBarChartDTO,
        ) => {
            return {
                ...state,
                competencyOverviewChart,
            };
        },
    );

    readonly setCompetencyDiffPercent = this.updater(
        (
            state: IHrOverviewState,
            competencyDiffPercent: IDiffPercentDTO,
        ) => {
            return {
                ...state,
                competencyDiffPercent,
            };
        },
    );

    readonly setPerformanceOverviewChart = this.updater(
        (
            state: IHrOverviewState,
            performanceOverviewChart: IBarChartDTO,
        ) => {
            return {
                ...state,
                performanceOverviewChart,
            };
        },
    );

    readonly setPerformanceDiffPercent = this.updater(
        (
            state: IHrOverviewState,
            performanceDiffPercent: IDiffPercentDTO,
        ) => {
            return {
                ...state,
                performanceDiffPercent,
            };
        },
    );

    readonly setCurrentHeadcounts = this.updater(
        (
            state: IHrOverviewState,
            currentHeadcounts: IPercentageChangeDTO,
        ) => {
            return {
                ...state,
                currentHeadcounts,
            };
        },
    );

    readonly setHeadcountChart = this.updater(
        (
            state: IHrOverviewState,
            headcountChart: IBarChartDTO,
        ) => {
            return {
                ...state,
                headcountChart,
            };
        },
    );


    //EFFECT
    readonly getCompetencyOverviewChart = this.effect(
        (params$: Observable<IHrOverviewParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.hrOverviewService.getCompetencyOverviewchart(params).pipe(
                        tapResponse({
                            next: res => this.setCompetencyOverviewChart(res.competencyOverviewChart),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getPerformanceOverviewChart = this.effect(
        (params$: Observable<IHrOverviewParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.hrOverviewService.getPerformanceOverviewchart(params).pipe(
                        tapResponse({
                            next: res => this.setPerformanceOverviewChart(res.performanceOverviewChart),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getCompetencyDiffPercent = this.effect(
        (params$: Observable<IHrOverviewParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.hrOverviewService.getCompetencyDiffPercent(params).pipe(
                        tapResponse({
                            next: res => this.setCompetencyDiffPercent(res.competencyDiffPercent),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getPerformanceDiffPercent = this.effect(
        (params$: Observable<IHrOverviewParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.hrOverviewService.getPerformanceDiffPercent(params).pipe(
                        tapResponse({
                            next: res => this.setPerformanceDiffPercent(res.performanceDiffPercent),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getCurrentHeadcounts = this.effect(
        (params$: Observable<number>) =>
            params$.pipe(
                switchMap(params =>
                    this.hrOverviewService.getCurrentHeadCount(params).pipe(
                        tapResponse({
                            next: res => this.setCurrentHeadcounts(res.currentHeadcounts),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getHeadcountChart = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() =>
                this.hrOverviewService.getHeadCountChart().pipe(
                    tapResponse({
                        next: res => this.setHeadcountChart(res.headcountChart),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}
