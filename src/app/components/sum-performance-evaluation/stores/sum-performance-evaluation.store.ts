import { Injectable } from "@angular/core";
import { IEvaluateCycle } from "../models/sum-performance-evaluation.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SumPerformanceEvaluationService } from "../services/sum-performance-evaluation.service";
import { Observable, switchMap } from "rxjs";

interface SumPerformanceEvaluationState {
    evaluateCycles: IEvaluateCycle[];
    previousCycle: number | null;
    currentCycle: number | null;
    departmentId: number | null;
}

@Injectable({
    providedIn: 'root',
})
export class SumPerformanceEvaluationStore extends ComponentStore<SumPerformanceEvaluationState> {
    constructor(private sumCompetencyEvaService: SumPerformanceEvaluationService) {
        super({
            evaluateCycles: [],
            previousCycle: null,
            currentCycle: null,
            departmentId: null,
        });
    }

    readonly evaluateCycles$ = this.select(state => state.evaluateCycles);
    readonly previousCycle$ = this.select(state => state.previousCycle);
    readonly currentCycle$ = this.select(state => state.currentCycle);
    readonly departmentId$ = this.select(state => state.departmentId);

    readonly setEvaluateCycles = this.updater(
        (state: SumPerformanceEvaluationState, evaluateCycles: IEvaluateCycle[]) => {
            return { ...state, evaluateCycles };
        },
    );

    readonly setPreviousCycle = this.updater(
        (state: SumPerformanceEvaluationState, previousCycle: number | null) => {
            return { ...state, previousCycle: previousCycle };
        },
    );

    readonly setCurrentCycle = this.updater(
        (state: SumPerformanceEvaluationState, currentCycle: number | null) => {
            return { ...state, currentCycle: currentCycle };
        },
    );

    readonly setDepartmentId = this.updater(
        (state: SumPerformanceEvaluationState, departmentId: number | null) => {
            return { ...state, departmentId: departmentId };
        },
    );

    readonly getEvaluateCycles = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() =>
                this.sumCompetencyEvaService.getEvaluateCycles().pipe(
                    tapResponse({
                        next: res => this.setEvaluateCycles(res.evaluateCycles),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );

    readonly getDepartmentId = this.effect((params$: Observable<string>) =>
        params$.pipe(
            switchMap(params =>
                this.sumCompetencyEvaService.getDepartmentId(params).pipe(
                    tapResponse({
                        next: res => {
                            this.setDepartmentId(res.departmentId);
                        },
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}