import { IEmployeeFeedback } from "src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model";
import { ICategoryRating, IEvaluationFormParams, IPerformanceOverall, IQuestionRating } from "../../self-evaluation-form/models/self-evaluation-form.model";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap } from "rxjs";
import { FinalEvaluationFormService } from "../services/final-evaluation-form.service";

interface FinalEvaluationFormState {
    finalPerformanceOverall: IPerformanceOverall | null;
    finalPerformanceCategoryRating: ICategoryRating[];
    finalPerformanceQuestionRating: IQuestionRating[];
    employeeFeedback: IEmployeeFeedback[];
}

@Injectable({
    providedIn: 'root',
})
export class FinalEvaluationFormStore extends ComponentStore<FinalEvaluationFormState> {
    constructor(private finalEvaluationFormService: FinalEvaluationFormService) {
        super({
            finalPerformanceOverall: null,
            finalPerformanceCategoryRating: [],
            finalPerformanceQuestionRating: [],
            employeeFeedback: []
        })
    }

    readonly finalPerformanceOverall$ = this.select(state => state.finalPerformanceOverall);
    readonly finalPerformanceCategoryRating$ = this.select(state => state.finalPerformanceCategoryRating);
    readonly finalPerformanceQuestionRating$ = this.select(state => state.finalPerformanceQuestionRating);
    readonly employeeFeedback$ = this.select(state => state.employeeFeedback);

    //UPDATER
    readonly setFinalPeformanceOverall = this.updater(
        (state: FinalEvaluationFormState, finalPerformanceOverall: IPerformanceOverall) => {
            return { ...state, finalPerformanceOverall: finalPerformanceOverall };
        },
    );

    readonly setFinalCategoryRating = this.updater(
        (state: FinalEvaluationFormState, finalPerformanceCategoryRating: ICategoryRating[]) => {
            return { ...state, finalPerformanceCategoryRating: finalPerformanceCategoryRating };
        },
    );

    readonly setFinalQuestionRating = this.updater(
        (state: FinalEvaluationFormState, finalPerformanceQuestionRating: IQuestionRating[]) => {
            return { ...state, finalPerformanceQuestionRating: finalPerformanceQuestionRating };
        },
    );

    readonly setEmployeeFeedback = this.updater(
        (state: FinalEvaluationFormState, employeeFeedback: IEmployeeFeedback[]) => {
            return { ...state, employeeFeedback: employeeFeedback };
        },
    );

    //EFFECT
    readonly getFinalPerformanceOverall = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.finalEvaluationFormService.getFinalPerformanceOverall(params).pipe(
                        tapResponse({
                            next: res => this.setFinalPeformanceOverall(res.finalPerformanceOverall),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getFinalCategoryRating = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.finalEvaluationFormService.getFinalCategoryRating(params).pipe(
                        tapResponse({
                            next: res => this.setFinalCategoryRating(res.finalPerformanceCategoryRating),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getFinalQuestionRating = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.finalEvaluationFormService.getFinalQuestionRating(params).pipe(
                        tapResponse({
                            next: res => this.setFinalQuestionRating(res.finalPerformanceQuestionRating),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getEmployeeFeedback = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.finalEvaluationFormService.getEmployeeFeedback(params).pipe(
                        tapResponse({
                            next: res => this.setEmployeeFeedback(res.employeeFeedback),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );
}