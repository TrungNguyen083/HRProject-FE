import { PaginatedData } from "src/app/models/global.model";
import { ICompetencyEvaItem, ICompetencyEvaluationPagingParams, ICompetencyEvaluationTitle, ITimeline } from "../models/competency-progress.model";
import { Injectable } from "@angular/core";
import { CompetencyProgressService } from "../services/competency-progress.service";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap } from "rxjs";

interface CompetencyProgressState {
    competencyEvaluationList: PaginatedData<ICompetencyEvaItem>;
    evaluateTimeline: ITimeline[];
    evaluationTitle: ICompetencyEvaluationTitle | null;
}

@Injectable({
    providedIn: 'root',
})
export class CompetencyProgressStore extends ComponentStore<CompetencyProgressState> {
    constructor(private competencyProgressService: CompetencyProgressService) {
        super({
            competencyEvaluationList: {
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

    readonly competencyEvaluationList$ = this.select(state => state.competencyEvaluationList);
    readonly evaluateTimeline$ = this.select(state => state.evaluateTimeline);
    readonly evaluationTitle$ = this.select(state => state.evaluationTitle);

    //UPDATER
    readonly setCompetencyProgress = this.updater(
        (state: CompetencyProgressState, competencyEvaluationList: PaginatedData<ICompetencyEvaItem>) => {
            return { ...state, competencyEvaluationList: competencyEvaluationList };
        },
    );

    readonly setEvaluateTimeline = this.updater(
        (
            state: CompetencyProgressState,
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
            state: CompetencyProgressState,
            evaluationTitle: ICompetencyEvaluationTitle,
        ) => {
            return {
                ...state,
                evaluationTitle,
            };
        },
    );

    //EFFECT
    readonly getCompetencyProgress = this.effect(
        (params$: Observable<ICompetencyEvaluationPagingParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.competencyProgressService.getCompetencyEvaluationPaging(params).pipe(
                        tapResponse({
                            next: res => this.setCompetencyProgress(res.competencyEvaluationList),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getEvaluateTimeline = this.effect((params$: Observable<number>) =>
        params$.pipe(
            switchMap(params =>
                this.competencyProgressService.getEvaluateTimeline(params).pipe(
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
                this.competencyProgressService.getCompetencyEvaluationTitle(params).pipe(
                    tapResponse({
                        next: res => this.setEvaluationTitle(res.evaluationTitle),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}