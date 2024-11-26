import { Injectable } from "@angular/core";
import { IEvaluateCycle } from "../../hr-dashboard/models/hr-dashboard.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { HrEvaluationOverviewService } from "../services/hr-evaluation-overview.service";
import { switchMap } from "rxjs";

interface HrEvaluationOverviewState {
    evaluateCycles: IEvaluateCycle[];
    previousCycle: number | null;
    currentCycle: number | null;
}

@Injectable({
    providedIn: 'root',
})
export class HrEvaluationOverviewStore extends ComponentStore<HrEvaluationOverviewState> {
    constructor(private hrEvaluationOverviewService: HrEvaluationOverviewService) {
        super({
            evaluateCycles: [],
            previousCycle: null,
            currentCycle: null,
        });
    }

    readonly evaluateCycles$ = this.select(state => state.evaluateCycles);
    readonly previousCycle$ = this.select(state => state.previousCycle);
    readonly currentCycle$ = this.select(state => state.currentCycle);

    readonly setEvaluateCycles = this.updater(
        (state: HrEvaluationOverviewState, evaluateCycles: IEvaluateCycle[]) => {
            return { ...state, evaluateCycles };
        },
    );

    readonly setPreviousCycle = this.updater(
        (state: HrEvaluationOverviewState, previousCycle: number | null) => {
            return { ...state, previousCycle: previousCycle };
        },
    );

    readonly setCurrentCycle = this.updater(
        (state: HrEvaluationOverviewState, currentCycle: number | null) => {
            return { ...state, currentCycle: currentCycle };
        },
    );

    readonly setDepartmentId = this.updater(
        (state: HrEvaluationOverviewState, departmentId: number | null) => {
            return { ...state, departmentId: departmentId };
        },
    );

    readonly getEvaluateCycles = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() =>
                this.hrEvaluationOverviewService.getEvaluateCycles().pipe(
                    tapResponse({
                        next: res => this.setEvaluateCycles(res.evaluateCycles),
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}