import { Injectable } from '@angular/core';
import {
  ICompanyCompletion,
  ICompetencyIncompletionStatus,
} from '../models/hr-dashboard.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { HrDashboardService } from '../services/hr-dashboard.service';

export interface ICompetencyCyleState {
  loading: boolean;
  cycleStatus: {
    departmentInCompleteComp: ICompetencyIncompletionStatus;
    competencyEvalProgress: ICompanyCompletion;
  };
}
@Injectable({
  providedIn: 'root',
})
export class CompetencyCycleStore extends ComponentStore<ICompetencyCyleState> {
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
      state: ICompetencyCyleState,
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
    (state: ICompetencyCyleState, loading: boolean) => ({ ...state, loading }),
  );
  //EFFECT
  readonly getDepartmentIncomplete = this.effect(
    (params$: Observable<number>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getCompetencyIncompletionStatus(params).pipe(
            $o => {
              this.setLoading(true);
              return $o;
            },
            tapResponse({
              next: res => {
                this.setLoading(false);
                return this.setCycleStatus({
                  departmentInCompleteComp: res.departmentInCompleteComp,
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
