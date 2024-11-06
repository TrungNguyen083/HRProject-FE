import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ICompetencyOverall, ICompetencyForm, ICompetencyGroup, IEvaluationFormParams } from "../../evaluation-form/models/evaluation-form.model";
import { Injectable } from "@angular/core";
import { ManagerEvaluationFormService } from "../services/manager-evaluation-form.service";
import { Observable, switchMap } from "rxjs";
import { IEmployeeFeedback } from "../models/manager-evaluation-form.model";

interface ManagerEvaluationFormState {
    managerCompetencyOverall: ICompetencyOverall | null;
    managerCompetencyEvaluationForm: ICompetencyForm[];
    managerCompetencyGroupRating: ICompetencyGroup[];
    employeeFeedback: IEmployeeFeedback[];
}

@Injectable({
    providedIn: 'root',
})
export class ManagerEvaluationFormStore extends ComponentStore<ManagerEvaluationFormState> {
    constructor(private managerEvaluationFormService: ManagerEvaluationFormService) {
        super({
            managerCompetencyOverall: null,
            managerCompetencyEvaluationForm: [],
            managerCompetencyGroupRating: [],
            employeeFeedback: []
        })
    }

    readonly managerCompetencyOverall$ = this.select(state => state.managerCompetencyOverall);
    readonly managerCompetencyEvaluationForm$ = this.select(state => state.managerCompetencyEvaluationForm);
    readonly managerCompetencyGroupRating$ = this.select(state => state.managerCompetencyGroupRating);
    readonly employeeFeedback$ = this.select(state => state.employeeFeedback);

    //UPDATER
    readonly setManagerCompetencyOverall = this.updater(
        (state: ManagerEvaluationFormState, managerCompetencyOverall: ICompetencyOverall) => {
            return { ...state, managerCompetencyOverall: managerCompetencyOverall };
        },
    );

    readonly setManagerCompetencyForm = this.updater(
        (state: ManagerEvaluationFormState, managerCompetencyEvaluationForm: ICompetencyForm[]) => {
            return { ...state, managerCompetencyEvaluationForm: managerCompetencyEvaluationForm };
        },
    );

    readonly setManagerCompetencyGroup = this.updater(
        (state: ManagerEvaluationFormState, managerCompetencyGroupRating: ICompetencyGroup[]) => {
            return { ...state, managerCompetencyGroupRating: managerCompetencyGroupRating };
        },
    );

    readonly setEmployeeFeedback = this.updater(
        (state: ManagerEvaluationFormState, employeeFeedback: IEmployeeFeedback[]) => {
            return { ...state, employeeFeedback: employeeFeedback };
        },
    );

    //EFFECT
    readonly getManagerCompetencyOverall = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.managerEvaluationFormService.getManagerCompetencyOverall(params).pipe(
                        tapResponse({
                            next: res => this.setManagerCompetencyOverall(res.managerCompetencyOverall),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getManagerCompetencyForm = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.managerEvaluationFormService.getManagerCompetencyForm(params).pipe(
                        tapResponse({
                            next: res => this.setManagerCompetencyForm(res.managerCompetencyEvaluationForm),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getManagerCompetencyGroup = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.managerEvaluationFormService.getManagerCompetencyGroup(params).pipe(
                        tapResponse({
                            next: res => this.setManagerCompetencyGroup(res.managerCompetencyGroupRating),
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