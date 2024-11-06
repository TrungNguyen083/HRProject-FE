import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { CompetencyEvaluationService } from "../services/competency-evaluation.service";
import { Injectable } from "@angular/core";
import { IEvaluateCycle } from "../models/competency-evaluation.model";
import { Observable, switchMap } from "rxjs";

interface CompetencyEvaluationState {
    evaluateCycles: IEvaluateCycle[];
    previousCycle: number | null;
    currentCycle: number | null;
    employeeId: number | null;
}

@Injectable({
    providedIn: 'root',
})

export class CompetencyEvaluationStore extends ComponentStore<CompetencyEvaluationState> {
    constructor(private competencyEvaluationService: CompetencyEvaluationService) {
        super({
            evaluateCycles: [],
            previousCycle: null,
            currentCycle: null,
            employeeId: null,
        });
    }

    readonly evaluateCycles$ = this.select(state => state.evaluateCycles);
    readonly previousCycle$ = this.select(state => state.previousCycle);
    readonly currentCycle$ = this.select(state => state.currentCycle);
    readonly employeeId$ = this.select(state => state.employeeId);


    readonly setEvaluateCycles = this.updater(
        (state: CompetencyEvaluationState, evaluateCycles: IEvaluateCycle[]) => {
            return { ...state, evaluateCycles };
        },
    );

    readonly setPreviousCycle = this.updater(
        (state: CompetencyEvaluationState, previousCycle: number | null) => {
            return { ...state, previousCycle: previousCycle };
        },
    );

    readonly setCurrentCycle = this.updater(
        (state: CompetencyEvaluationState, currentCycle: number | null) => {
            return { ...state, currentCycle: currentCycle };
        },
    );

    readonly setEmployeeId = this.updater(
        (state: CompetencyEvaluationState, employeeId: number | null) => {
            return { ...state, employeeId: employeeId };
        },
    );

    readonly getEvaluateCycles = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() =>
                this.competencyEvaluationService.getEvaluateCycles().pipe(
                    tapResponse({
                        next: res => this.setEvaluateCycles(res.evaluateCycles),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );

    readonly getEmployeeId = this.effect((params$: Observable<string>) =>
        params$.pipe(
            switchMap(params =>
                this.competencyEvaluationService.getEmployeeId(params).pipe(
                    tapResponse({
                        next: res => {
                            this.setEmployeeId(res.employeeId);
                        },
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}