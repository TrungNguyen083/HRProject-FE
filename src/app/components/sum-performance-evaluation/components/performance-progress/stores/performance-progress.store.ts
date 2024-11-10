import { PaginatedData } from "src/app/models/global.model";
import { IPerformanceEvaItem, IPerformanceEvaluationPagingParams, IPerformanceEvaluationTitle, ITimeline } from "../models/performance-progress.model";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap } from "rxjs";
import { PerformanceProgressService } from "../services/performance-progress.service";

interface PerformanceProgressState {
    performanceEvaluationList: PaginatedData<IPerformanceEvaItem>;
    evaluateTimeline: ITimeline[];
    evaluationTitle: IPerformanceEvaluationTitle | null;
}

@Injectable({
    providedIn: 'root',
})
export class PerformanceProgressStore extends ComponentStore<PerformanceProgressState> {
    constructor(private performanceProgressService: PerformanceProgressService) {
        super({
            performanceEvaluationList: {
                pagination: {
                    pageNo: 0,
                    pageSize: 0,
                    totalItems: 0,
                    totalPages: 0,
                },
                data: [],
            },
            evaluateTimeline: [],
            evaluationTitle: null,
        })
    }

    readonly performanceEvaluationList$ = this.select(state => state.performanceEvaluationList);
    readonly evaluateTimeline$ = this.select(state => state.evaluateTimeline);
    readonly evaluationTitle$ = this.select(state => state.evaluationTitle);

    //UPDATER
    readonly setPerformanceProgress = this.updater(
        (state: PerformanceProgressState, performanceEvaluationList: PaginatedData<IPerformanceEvaItem>) => {
            return { ...state, performanceEvaluationList: performanceEvaluationList };
        },
    );

    readonly setEvaluateTimeline = this.updater(
        (
            state: PerformanceProgressState,
            evaluateTimeline: ITimeline[],
        ) => {
            return {
                ...state,
                evaluateTimeline,
            };
        },
    );

    readonly setEvaluationTitle = this.updater(
        (
            state: PerformanceProgressState,
            evaluationTitle: IPerformanceEvaluationTitle,
        ) => {
            return {
                ...state,
                evaluationTitle,
            };
        },
    );

    //EFFECT
    readonly getPerformanceProgress = this.effect(
        (params$: Observable<IPerformanceEvaluationPagingParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.performanceProgressService.getPerformanceEvaluationPaging(params).pipe(
                        tapResponse({
                            next: res => this.setPerformanceProgress(res.performanceEvaluationList),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getEvaluateTimeline = this.effect((params$: Observable<number>) =>
        params$.pipe(
            switchMap(params =>
                this.performanceProgressService.getEvaluateTimeline(params).pipe(
                    tapResponse({
                        next: res => this.setEvaluateTimeline(res.evaluateTimeLine),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );

    readonly getEvaluationTitle = this.effect((params$: Observable<number>) =>
        params$.pipe(
            switchMap(params =>
                this.performanceProgressService.getPerformanceEvaluationTitle(params).pipe(
                    tapResponse({
                        next: res => this.setEvaluationTitle(res.evaluationTitle),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}