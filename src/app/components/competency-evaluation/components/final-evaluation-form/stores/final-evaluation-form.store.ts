import { Injectable } from "@angular/core";
import { ICompetencyOverall, ICompetencyForm, ICompetencyGroup, IEvaluationFormParams } from "../../evaluation-form/models/evaluation-form.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { FinalEvaluationFormService } from "../services/final-evaluation-form.service";
import { Observable, switchMap } from "rxjs";
import { IEmployeeFeedback } from "../../manager-evaluation-form/models/manager-evaluation-form.model";

interface FinalEvaluationFormState {
    finalCompetencyOverall: ICompetencyOverall | null;
    finalCompetencyEvaluationForm: ICompetencyForm[];
    finalCompetencyGroupRating: ICompetencyGroup[];
    employeeFeedback: IEmployeeFeedback[];
}

@Injectable({
    providedIn: 'root',
})
export class FinalEvaluationFormStore extends ComponentStore<FinalEvaluationFormState> {
    constructor(private finalEvaluationFormService: FinalEvaluationFormService) {
        super({
            finalCompetencyOverall: null,
            finalCompetencyEvaluationForm: [],
            finalCompetencyGroupRating: [],
            employeeFeedback: []
        })
    }

    readonly finalCompetencyOverall$ = this.select(state => state.finalCompetencyOverall);
    readonly finalCompetencyEvaluationForm$ = this.select(state => state.finalCompetencyEvaluationForm);
    readonly finalCompetencyGroupRating$ = this.select(state => state.finalCompetencyGroupRating);
    readonly employeeFeedback$ = this.select(state => state.employeeFeedback);

    //UPDATER
    readonly setFinalCompetencyOverall = this.updater(
        (state: FinalEvaluationFormState, finalCompetencyOverall: ICompetencyOverall) => {
            return { ...state, finalCompetencyOverall: finalCompetencyOverall };
        },
    );

    readonly setFinalCompetencyForm = this.updater(
        (state: FinalEvaluationFormState, finalCompetencyEvaluationForm: ICompetencyForm[]) => {
            return { ...state, finalCompetencyEvaluationForm: finalCompetencyEvaluationForm };
        },
    );

    readonly setFinalCompetencyGroup = this.updater(
        (state: FinalEvaluationFormState, finalCompetencyGroupRating: ICompetencyGroup[]) => {
            return { ...state, finalCompetencyGroupRating: finalCompetencyGroupRating };
        },
    );

    readonly setEmployeeFeedback = this.updater(
        (state: FinalEvaluationFormState, employeeFeedback: IEmployeeFeedback[]) => {
            return { ...state, employeeFeedback: employeeFeedback };
        },
    );

    //EFFECT
    readonly getFinalCompetencyOverall = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.finalEvaluationFormService.getFinalCompetencyOverall(params).pipe(
                        tapResponse({
                            next: res => this.setFinalCompetencyOverall(res.finalCompetencyOverall),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getFinalCompetencyForm = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.finalEvaluationFormService.getFinalCompetencyForm(params).pipe(
                        tapResponse({
                            next: res => this.setFinalCompetencyForm(res.finalCompetencyEvaluationForm),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getFinalCompetencyGroup = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.finalEvaluationFormService.getFinalCompetencyGroup(params).pipe(
                        tapResponse({
                            next: res => this.setFinalCompetencyGroup(res.finalCompetencyGroupRating),
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