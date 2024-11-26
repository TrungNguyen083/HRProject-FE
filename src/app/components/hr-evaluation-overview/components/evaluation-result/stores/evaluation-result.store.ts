import { PaginatedData } from "src/app/models/global.model";
import { IEvaluationResult, IEvaluationResultParams, IEvaluationResultTitle } from "../models/evaluation-result.model";
import { ITimeline } from "src/app/components/sum-competency-evaluation/components/competency-progress/models/competency-progress.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { EvaluationResultService } from "../services/evaluation-result.service";
import { Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";

interface EvaluationResultState {
    evaluationOverviewList: PaginatedData<IEvaluationResult>;
    evaluateTimeline: ITimeline[];
    evaluationTitle: IEvaluationResultTitle | null;
    selectedEvaIds: number[];
    headerChecked: boolean;
}
@Injectable({
    providedIn: 'root',
})
export class EvaluationResultStore extends ComponentStore<EvaluationResultState> {
    constructor(private evaluationResultService: EvaluationResultService) {
        super({
            evaluationOverviewList: {
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
            selectedEvaIds: [],
            headerChecked: false,
        })
    }

    readonly evaluationOverviewList$ = this.select(state => state.evaluationOverviewList);
    readonly evaluateTimeline$ = this.select(state => state.evaluateTimeline);
    readonly evaluationTitle$ = this.select(state => state.evaluationTitle);
    readonly selectedEvaIds$ = this.select(state => state.selectedEvaIds);
    readonly headerChecked$ = this.select(state => state.headerChecked);

    //UPDATER
    readonly setEvaluationOverviewList = this.updater(
        (state: EvaluationResultState, evaluationOverviewList: PaginatedData<IEvaluationResult>) => {
            return { ...state, evaluationOverviewList: evaluationOverviewList };
        },
    );

    readonly setEvaluateTimeline = this.updater(
        (state: EvaluationResultState, evaluateTimeline: ITimeline[]) => {
            return { ...state, evaluateTimeline, };
        },
    );

    readonly setEvaluationTitle = this.updater(
        (state: EvaluationResultState, evaluationTitle: IEvaluationResultTitle) => {
            return { ...state, evaluationTitle, };
        },
    );

    readonly addEval = this.updater(
        (state: EvaluationResultState, evaId: number) => {
          state.selectedEvaIds = [
            ...new Set([...state.selectedEvaIds, evaId]),
          ];
          const { totalItems } = state.evaluationOverviewList.pagination;
          if (totalItems === state.selectedEvaIds.length) {
            this.setHeaderChecked(true);
          }
          return {
            ...state,
          };
        },
      );

      readonly removeEva = this.updater(
        (state: EvaluationResultState, evaId: number) => {
          const { totalItems } = state.evaluationOverviewList.pagination;
          state.selectedEvaIds = state.selectedEvaIds.filter(
            id => id !== evaId,
          );
          if (totalItems !== state.selectedEvaIds.length) {
            this.setHeaderChecked(false);
          }
          return {
            ...state,
          };
        },
      );

      readonly removeAllEva = this.updater((state: EvaluationResultState) => {
        state.selectedEvaIds = [];
        return {
          ...state,
        };
      });

      readonly setHeaderChecked = this.updater(
        (state: EvaluationResultState, headerChecked: boolean) => {
          return {
            ...state,
            headerChecked,
          };
        },
      );

    //EFFECT
    readonly getEvaluationOverviewList = this.effect(
        (params$: Observable<IEvaluationResultParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.evaluationResultService.getEvaluationOverviewList(params).pipe(
                        tapResponse({
                            next: res => this.setEvaluationOverviewList(res.evaluationOverviewList),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getEvaluateTimeline = this.effect((params$: Observable<number>) =>
        params$.pipe(
            switchMap(params =>
                this.evaluationResultService.getEvaluateTimeline(params).pipe(
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
                this.evaluationResultService.getEvaluationTitle(params).pipe(
                    tapResponse({
                        next: res => this.setEvaluationTitle(res.evaluationTitle),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}