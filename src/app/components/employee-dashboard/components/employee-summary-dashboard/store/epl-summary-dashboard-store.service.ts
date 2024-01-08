import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { PaginatedData } from 'src/app/models/global.model';
import { defaultTable as defaultTableData } from '../constants/employee-summary-dashboard.constant';
import {
  IEmployeeAtGlance,
  IEmployeeCompetencyOverallScore,
  IEmployeePerformanceRating,
  IEmployeeScoreParams,
  IEmployeeSkillScore,
} from '../models/employee-summary-dashboard';
import { EmDashboardSummaryService } from '../services/epl-dashboard-summary.service';

interface EplSummaryDashboardState {
  employeeHighestSkills: PaginatedData<IEmployeeSkillScore>;
  employeeTargetSkills: PaginatedData<IEmployeeSkillScore>;
  employeeImproveSkills: PaginatedData<IEmployeeSkillScore>;
  employeeAtGlance: IEmployeeAtGlance | null;
  employeePerformanceRating: IEmployeePerformanceRating;
  employeeCompOverallScore: IEmployeeCompetencyOverallScore | null;
}
@Injectable({
  providedIn: 'root',
})
export class EplSummaryDashboardStore extends ComponentStore<EplSummaryDashboardState> {
  constructor(private summaryService: EmDashboardSummaryService) {
    super({
      employeeHighestSkills: defaultTableData,
      employeeTargetSkills: defaultTableData,
      employeeImproveSkills: defaultTableData,
      employeeAtGlance: null,
      employeePerformanceRating: { data: [] },
      employeeCompOverallScore: null,
    });
  }

  //SELECTOR
  readonly employeeHighestSkills$ = this.select(state => state.employeeHighestSkills);
  readonly employeeTargetSkills$ = this.select(state => state.employeeTargetSkills);
  readonly employeeImproveSkills$ = this.select(state => state.employeeImproveSkills);
  readonly employeeAtGlance$ = this.select(state => state.employeeAtGlance);
  readonly employeePerformanceRating$ = this.select(state => state.employeePerformanceRating);
  readonly employeeCompOverallScore$ = this.select(state => state.employeeCompOverallScore);

  //UPDATER
  readonly setEmployeeHighestSkills = this.updater(
    (
      state: EplSummaryDashboardState,
      employeeHighestSkills: PaginatedData<IEmployeeSkillScore>,
    ) => {
      return {
        ...state,
        employeeHighestSkills,
      };
    },
  );
  readonly setEmployeeTargetSkills = this.updater(
    (
      state: EplSummaryDashboardState,
      employeeTargetSkills: PaginatedData<IEmployeeSkillScore>,
    ) => {
      return {
        ...state,
        employeeTargetSkills,
      };
    },
  );

  readonly setEmployeeImproveSkills = this.updater(
    (
      state: EplSummaryDashboardState,
      employeeImproveSkills: PaginatedData<IEmployeeSkillScore>,
    ) => {
      return {
        ...state,
        employeeImproveSkills,
      };
    },
  );
  readonly setEmployeeAtGlance = this.updater(
    (state: EplSummaryDashboardState, employeeAtGlance: IEmployeeAtGlance) => {
      return {
        ...state,
        employeeAtGlance,
      };
    },
  );
  readonly setEmployeePerformanceRating = this.updater(
    (
      state: EplSummaryDashboardState,
      employeePerformanceRating: IEmployeePerformanceRating,
    ) => {
      return {
        ...state,
        employeePerformanceRating,
      };
    },
  );
  readonly setEmployeeCompOverallScore = this.updater(
    (
      state: EplSummaryDashboardState,
      employeeCompOverallScore: IEmployeeCompetencyOverallScore,
    ) => {
      return {
        ...state,
        employeeCompOverallScore,
      };
    },
  );

  //EFFECT
  readonly getEmployeeHighestSkills = this.effect(
    (params$: Observable<IEmployeeScoreParams>) =>
      params$.pipe(
        switchMap(params =>
          this.summaryService.getEmployeeHighestSkills(params).pipe(
            tapResponse({
              next: res =>
                this.setEmployeeHighestSkills(res.topSkillSet),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getEmployeeTargetSkills = this.effect(
    (params$: Observable<IEmployeeScoreParams>) =>
      params$.pipe(
        switchMap(params =>
          this.summaryService.getEmployeeTargetSkills(params).pipe(
            tapResponse({
              next: res =>
                this.setEmployeeTargetSkills(
                  res.topHighestSkillSetTargetEmployee,
                ),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getEmployeeImproveSkills = this.effect(
    (params$: Observable<IEmployeeScoreParams>) =>
      params$.pipe(
        switchMap(params =>
          this.summaryService.getEmployeeImproveSkills(params).pipe(
            tapResponse({
              next: res =>
                this.setEmployeeImproveSkills(res.topKeenSkillSetEmployee),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getEmployeeAtGlance = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap(params =>
        this.summaryService.getEmployeeAtGlance(params).pipe(
          tapResponse({
            next: res => this.setEmployeeAtGlance(res.getAtGlance),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getEmployeePerformanceRating = this.effect(
    (params$: Observable<number>) =>
      params$.pipe(
        switchMap(params =>
          this.summaryService.getEmployeePerformanceRating(params).pipe(
            tapResponse({
              next: res =>
                this.setEmployeePerformanceRating(
                  res.employeePerformanceRatingScore,
                ),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getEmployeeOverallScore = this.effect(
    (params$: Observable<number>) =>
      params$.pipe(
        switchMap(params =>
          this.summaryService.getEmployeeCompetencyOverallScore(params).pipe(
            tapResponse({
              next: res =>
                this.setEmployeeCompOverallScore(
                  res.getOverallCompetencyScore,
                ),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
}
