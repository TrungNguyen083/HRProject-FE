import { Injectable } from '@angular/core';
import {
  ICompanyCompletion,
  ICompetencyIncompletionStatus,
} from '../models/hr-dashboard.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { HrDashboardService } from '../services/hr-dashboard.service';

export interface IEvaluateCyleState {
  loading: boolean;
  cycleStatus: {
    departmentInCompleteComp: ICompetencyIncompletionStatus;
    competencyEvalProgress: ICompanyCompletion;
  };
}
@Injectable({
  providedIn: 'root',
})
export class EvaluateCycleStore extends ComponentStore<IEvaluateCyleState> {
  constructor(private hrDashboardService: HrDashboardService) {
    super({
      loading: true,
      cycleStatus: {
        departmentInCompleteComp: {
          labels: [],
          datasets: [],
        },
        competencyEvalProgress: {
          labels: [],
          datasets: [],
        },
      },
    });
  }

  //SELECTOR
  readonly cycleStatus$ = this.select(state => state.cycleStatus);
  readonly loading$ = this.select(state => state.loading)
  //UPDATER
  readonly setCycleStatus = this.updater(
    (
      state: IEvaluateCyleState,
      cycleStatus: {
        departmentInCompleteComp: ICompetencyIncompletionStatus;
        competencyEvalProgress: ICompanyCompletion;
      },
    ) => {
      return {
        ...state,
        cycleStatus,
      };
    },
  );

  readonly setLoading = this.updater(
    (state: IEvaluateCyleState, loading: boolean) => ({ ...state, loading }),
  );
  //EFFECT
  readonly getDepartmentIncomplete = this.effect(
    (params$: Observable<number>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getCompetencyCompletionStatus(params).pipe(
            $o => {
              this.setLoading(true);
              return $o;
            },
            tapResponse({
              next: res => {
                this.setLoading(false);
                return this.setCycleStatus({
                  departmentInCompleteComp: res.departmentCompleteComp,
                  competencyEvalProgress: res.competencyEvalProgress,
                });
              },
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
}
