import { Injectable } from "@angular/core";
import { ICategoryRating, IEvaluationFormParams, IPerformanceOverall, IQuestionRating } from "../models/self-evaluation-form.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SelfEvaluationFormService } from "../services/self-evaluation-form.service";
import { Observable, switchMap } from "rxjs";

interface SelfEvaluationFormState {
    performanceOverall: IPerformanceOverall | null;
    performanceCategoryRating: ICategoryRating[];
    performanceQuestionRating: IQuestionRating[];
}

@Injectable({
    providedIn: 'root',
})
export class SelfEvaluationFormStore extends ComponentStore<SelfEvaluationFormState> {
    constructor(private selfEvaluationFormService: SelfEvaluationFormService) {
        super({
            performanceOverall: null,
            performanceCategoryRating: [],
            performanceQuestionRating: [],
        })
    }

    readonly performanceOverall$ = this.select(state => state.performanceOverall);
    readonly performanceCategoryRating$ = this.select(state => state.performanceCategoryRating);
    readonly performanceQuestionRating$ = this.select(state => state.performanceQuestionRating);

    //UPDATER
    readonly setPeformanceOverall = this.updater(
        (state: SelfEvaluationFormState, performanceOverall: IPerformanceOverall) => {
            return { ...state, performanceOverall: performanceOverall };
        },
    );

    readonly setCategoryRating = this.updater(
        (state: SelfEvaluationFormState, performanceCategoryRating: ICategoryRating[]) => {
            return { ...state, performanceCategoryRating: performanceCategoryRating };
        },
    );

    readonly setQuestionRating = this.updater(
        (state: SelfEvaluationFormState, performanceQuestionRating: IQuestionRating[]) => {
            return { ...state, performanceQuestionRating: performanceQuestionRating };
        },
    );

    //EFFECT
    readonly getPerformanceOverall = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.selfEvaluationFormService.getPerformanceOverall(params).pipe(
                        tapResponse({
                            next: res => this.setPeformanceOverall(res.performanceOverall),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getCategoryRating = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.selfEvaluationFormService.getCategoryRating(params).pipe(
                        tapResponse({
                            next: res => this.setCategoryRating(res.performanceCategoryRating),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getQuestionRating = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.selfEvaluationFormService.getQuestionRating(params).pipe(
                        tapResponse({
                            next: res => this.setQuestionRating(res.performanceQuestionRating),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );
}