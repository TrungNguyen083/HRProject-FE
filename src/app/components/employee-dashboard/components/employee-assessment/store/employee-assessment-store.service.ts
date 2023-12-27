import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import {
  ICurrentEvaluation,
  IEvaluationHistory,
} from '../models/employee-assessment.model';
import { EmployeeAssessmentService } from '../services/employee-assessment.service';

interface IEmployeeEvaluationState {
  currentEvaluation: ICurrentEvaluation | null;
  historyEvaluation: IEvaluationHistory[];
}
@Injectable({
  providedIn: 'root',
})
export class EmployeeAssessmentStore extends ComponentStore<IEmployeeEvaluationState> {
  constructor(private eplAssessmentService: EmployeeAssessmentService) {
    super({
      currentEvaluation: null,
      historyEvaluation: [],
    });
  }

  readonly currentEvaluation$: Observable<ICurrentEvaluation | null> =
    this.select(state => state.currentEvaluation);

  readonly historyEvaluation$: Observable<IEvaluationHistory[]> = this.select(
    state => state.historyEvaluation,
  );
  readonly setCurrentEvaluation = this.updater(
    (
      state: IEmployeeEvaluationState,
      currentEvaluation: ICurrentEvaluation,
    ) => {
      return { ...state, currentEvaluation };
    },
  );

  readonly setHistoryEvaluation = this.updater(
    (
      state: IEmployeeEvaluationState,
      historyEvaluation: IEvaluationHistory[],
    ) => {
      return { ...state, historyEvaluation };
    },
  );

  readonly getEmployeeEvaluation = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap(params =>
        this.eplAssessmentService.getEmployeeEvaluation(params).pipe(
          tapResponse({
            next: res => {
              this.setCurrentEvaluation(res.currentEvaluation);
              this.setHistoryEvaluation(res.historyEvaluation);
            },
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
