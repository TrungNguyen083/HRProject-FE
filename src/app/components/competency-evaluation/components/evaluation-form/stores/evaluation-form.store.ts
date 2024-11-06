import { Injectable } from "@angular/core";
import { ICompetencyForm, ICompetencyGroup, ICompetencyOverall, IEvaluationFormParams } from "../models/evaluation-form.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { EvaluationFormService } from "../services/evaluation-form.service";
import { Observable, switchMap } from "rxjs";

interface EvaluationFormState {
    competencyOverall: ICompetencyOverall | null;
    competencyEvaluationForm: ICompetencyForm[];
    competencyGroupRating: ICompetencyGroup[];
}

@Injectable({
    providedIn: 'root',
})
export class EvaluationFormStore extends ComponentStore<EvaluationFormState> {
    constructor(private evaluationFormService: EvaluationFormService) {
        super({
            competencyOverall: null,
            competencyEvaluationForm: [],
            competencyGroupRating: [],
        })
    }

    readonly competencyOverall$ = this.select(state => state.competencyOverall);
    readonly competencyEvaluationForm$ = this.select(state => state.competencyEvaluationForm);
    readonly competencyGroupRating$ = this.select(state => state.competencyGroupRating);

    //UPDATER
    readonly setCompetencyOverall = this.updater(
        (state: EvaluationFormState, competencyOverall: ICompetencyOverall) => {
            return { ...state, competencyOverall: competencyOverall };
        },
    );

    readonly setCompetencyForm = this.updater(
        (state: EvaluationFormState, competencyEvaluationForm: ICompetencyForm[]) => {
            return { ...state, competencyEvaluationForm: competencyEvaluationForm };
        },
    );

    readonly setCompetencyGroup = this.updater(
        (state: EvaluationFormState, competencyGroupRating: ICompetencyGroup[]) => {
            return { ...state, competencyGroupRating: competencyGroupRating };
        },
    );

    //EFFECT
    readonly getCompetencyOverall = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.evaluationFormService.getCompetencyOverall(params).pipe(
                        tapResponse({
                            next: res => this.setCompetencyOverall(res.competencyOverall),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getCompetencyForm = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.evaluationFormService.getCompetencyForm(params).pipe(
                        tapResponse({
                            next: res => this.setCompetencyForm(res.competencyEvaluationForm),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );

    readonly getCompetencyGroup = this.effect(
        (params$: Observable<IEvaluationFormParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.evaluationFormService.getCompetencyGroup(params).pipe(
                        tapResponse({
                            next: res => this.setCompetencyGroup(res.competencyGroupRating),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );
}