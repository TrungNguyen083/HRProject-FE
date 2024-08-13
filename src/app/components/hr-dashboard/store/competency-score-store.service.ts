import { Injectable } from '@angular/core';
import {
  IAvgCompetencyScore,
  ICompetencyByLevelAndPositionParams,
  ICompetencyRadarChart,
  ICompetencyRadarChartParams,
} from '../models/hr-dashboard.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { HrDashboardService } from '../services/hr-dashboard.service';

interface ICompetencyScoreState {
  scoreByLevelAndPosition: IAvgCompetencyScore[];
  competencyRadarChart: ICompetencyRadarChart;
}
@Injectable({
  providedIn: 'root',
})
export class CompetencyScoreStoreService extends ComponentStore<ICompetencyScoreState> {
  constructor(private hrDashboardService: HrDashboardService) {
    super({
      scoreByLevelAndPosition: [],
      competencyRadarChart: {
        labels: [],
        datasets: [],
      },
    });
  }

  //SELECTOR
  readonly scoreByLevelAndPosition$ = this.select(
    state => state.scoreByLevelAndPosition,
  );
  readonly competencyRadarChart$ = this.select(state => state.competencyRadarChart);
  //UPDATER
  readonly setScoreByLevelAndPosition = this.updater(
    (
      state: ICompetencyScoreState,
      scoreByLevelAndPosition: IAvgCompetencyScore[],
    ) => {
      return {
        ...state,
        scoreByLevelAndPosition,
      };
    },
  );
  readonly setCompetencyRadarChart = this.updater(
    (state: ICompetencyScoreState, competencyRadarChart: ICompetencyRadarChart) => {
      return {
        ...state,
        competencyRadarChart: competencyRadarChart,
      };
    },
  );
  //EFFECT
  readonly getScoreByLevelAndPosition = this.effect(
    (params$: Observable<ICompetencyByLevelAndPositionParams>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getCompetencyByLevelAndPosition(params).pipe(
            tapResponse({
              next: res =>
                this.setScoreByLevelAndPosition(res.avgCompetencyScore),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
  readonly getCompetencyRadarChart = this.effect(
    (params$: Observable<ICompetencyRadarChartParams>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getCompetencyRadarChart(params).pipe(
            tapResponse({
              next: res => this.setCompetencyRadarChart(res.competencyRadarChart),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
}
