import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ManagerEvaluationFormService } from "../services/manager-evaluation-form.service";
import { ICategoryRating, IEvaluationFormParams, IPerformanceOverall, IQuestionRating } from "../../self-evaluation-form/models/self-evaluation-form.model";
import { Observable, switchMap } from "rxjs";
import { IEmployeeFeedback } from "src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model";

interface ManagerEvaluationFormState {
    managerPerformanceOverall: IPerformanceOverall | null;
    managerPerformanceCategoryRating: ICategoryRating[];
    managerPerformanceQuestionRating: IQuestionRating[];
    employeeFeedback: IEmployeeFeedback[];
}

@Injectable({
    providedIn: 'root',
})
export class ManagerEvaluationFormStore extends ComponentStore<ManagerEvaluationFormState> {
    constructor(private managerEvaluationFormService: ManagerEvaluationFormService) {
        super({
            managerPerformanceOverall: null,
            managerPerformanceCategoryRating: [],
            managerPerformanceQuestionRating: [],
            employeeFeedback: []
        })
    }

    readonly managerPerformanceOverall$ = this.select(state => state.managerPerformanceOverall);
    readonly managerPerformanceCategoryRating$ = this.select(state => state.managerPerformanceCategoryRating);
    readonly managerPerformanceQuestionRating$ = this.select(state => state.managerPerformanceQuestionRating);
    readonly employeeFeedback$ = this.select(state => state.employeeFeedback);

    //UPDATER
    readonly setManagerPeformanceOverall = this.updater(
        (state: ManagerEvaluationFormState, managerPerformanceOverall: IPerformanceOverall) => {
            return { ...state, managerPerformanceOverall: managerPerformanceOverall };
        },
    );

    readonly setManagerCategoryRating = this.updater(
        (state: ManagerEvaluationFormState, managerPerformanceCategoryRating: ICategoryRating[]) => {
            return { ...state, managerPerformanceCategoryRating: managerPerformanceCategoryRating };
        },
    );

    readonly setManagerQuestionRating = this.updater(
        (state: ManagerEvaluationFormState, managerPerformanceQuestionRating: IQuestionRating[]) => {
            return { ...state, managerPerformanceQuestionRating: managerPerformanceQuestionRating };
        },
    );

    readonly setEmployeeFeedback = this.updater(
        (state: ManagerEvaluationFormState, employeeFeedback: IEmployeeFeedback[]) => {
            return { ...state, employeeFeedback: employeeFeedback };
        },
    );

    //EFFECT
    readonly getManagerPerformanceOverall = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.managerEvaluationFormService.getManagerPerformanceOverall(params).pipe(
                        tapResponse({
                            next: res => this.setManagerPeformanceOverall(res.managerPerformanceOverall),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getManagerCategoryRating = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.managerEvaluationFormService.getManagerCategoryRating(params).pipe(
                        tapResponse({
                            next: res => this.setManagerCategoryRating(res.managerPerformanceCategoryRating),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getManagerQuestionRating = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.managerEvaluationFormService.getManagerQuestionRating(params).pipe(
                        tapResponse({
                            next: res => this.setManagerQuestionRating(res.managerPerformanceQuestionRating),
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
                    this.managerEvaluationFormService.getEmployeeFeedback(params).pipe(
                        tapResponse({
                            next: res => this.setEmployeeFeedback(res.employeeFeedback),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );
}