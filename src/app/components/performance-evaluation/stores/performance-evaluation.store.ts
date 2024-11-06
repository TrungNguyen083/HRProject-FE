import { Injectable } from "@angular/core";
import { IEvaluateCycle } from "../models/performance-evaluation.model";
import { PerformanceEvaluationService } from "../services/performance-evaluation.service";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap } from "rxjs";

interface PerformanceEvaluationState {
    evaluateCycles: IEvaluateCycle[];
    previousCycle: number | null;
    currentCycle: number | null;
    employeeId: number | null;
}

@Injectable({
    providedIn: 'root',
})

export class PerformanceEvaluationStore extends ComponentStore<PerformanceEvaluationState> {
    constructor(private performanceEvaluationService: PerformanceEvaluationService) {
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
        (state: PerformanceEvaluationState, evaluateCycles: IEvaluateCycle[]) => {
            return { ...state, evaluateCycles };
        },
    );

    readonly setPreviousCycle = this.updater(
        (state: PerformanceEvaluationState, previousCycle: number | null) => {
            return { ...state, previousCycle: previousCycle };
        },
    );

    readonly setCurrentCycle = this.updater(
        (state: PerformanceEvaluationState, currentCycle: number | null) => {
            return { ...state, currentCycle: currentCycle };
        },
    );

    readonly setEmployeeId = this.updater(
        (state: PerformanceEvaluationState, employeeId: number | null) => {
            return { ...state, employeeId: employeeId };
        },
    );

    readonly getEvaluateCycles = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() =>
                this.performanceEvaluationService.getEvaluateCycles().pipe(
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
                this.performanceEvaluationService.getEmployeeId(params).pipe(
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