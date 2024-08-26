import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { PaginatedData } from 'src/app/models/global.model';
import { defaultTable as defaultTableData } from '../constants/employee-summary-dashboard.constant';
import {
  IEmployeeAtGlanceParams,
  IEmployeeCompetencyOverallRadarChart,
  IEmployeeCompetencyOverallRadarChartParams,
  IEmployeeCompetencyPieChart,
  IEmployeePerformanceRating,
  IEmployeeScoreParams,
  IEmployeeSkillGapBarChart,
  IEmployeeSkillScore,
} from '../models/employee-summary-dashboard';
import { EmDashboardSummaryService } from '../services/epl-dashboard-summary.service';

interface EplSummaryDashboardState {
  employeeHighestSkills: PaginatedData<IEmployeeSkillScore>;
  employeeTargetSkills: PaginatedData<IEmployeeSkillScore>;
  employeeImproveSkills: PaginatedData<IEmployeeSkillScore>;
  employeeSkillGapBarChart: IEmployeeSkillGapBarChart | null;
  employeeCompetencyPieChart: IEmployeeCompetencyPieChart | null;
  employeePerformanceRating: IEmployeePerformanceRating;
  employeeCompOverallRadarChart: IEmployeeCompetencyOverallRadarChart;
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
      employeeSkillGapBarChart: null,
      employeeCompetencyPieChart: null,
      employeePerformanceRating: { data: [] },
      employeeCompOverallRadarChart: {
        labels: [],
        datasets: [],
      },
    });
  }

  //SELECTOR
  readonly employeeHighestSkills$ = this.select(state => state.employeeHighestSkills);
  readonly employeeTargetSkills$ = this.select(state => state.employeeTargetSkills);
  readonly employeeImproveSkills$ = this.select(state => state.employeeImproveSkills);
  readonly employeeSkillGapBarChart$ = this.select(state => state.employeeSkillGapBarChart);
  readonly employeeCompetencyPieChart$ = this.select(state => state.employeeCompetencyPieChart);
  readonly employeePerformanceRating$ = this.select(state => state.employeePerformanceRating);
  readonly employeeCompOverallRadarChart$ = this.select(state => state.employeeCompOverallRadarChart);

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
  readonly setEmployeeSkillGapBarChart = this.updater(
    (
      state: EplSummaryDashboardState,
      employeeSkillGapBarChart: IEmployeeSkillGapBarChart
    ) => {
      console.log("Updating State with skillGapBarChart: ", employeeSkillGapBarChart);
      return {
        ...state,
        employeeSkillGapBarChart,
      };
    },
  );
  readonly setEmployeeCompetencyPieChart = this.updater(
    (
      state: EplSummaryDashboardState,
      employeeCompetencyPieChart: IEmployeeCompetencyPieChart
    ) => {
      return {
        ...state,
        employeeCompetencyPieChart,
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
  readonly setEmployeeCompOverallRadarChart = this.updater(
    (
      state: EplSummaryDashboardState,
      employeeCompOverallRadarChart: IEmployeeCompetencyOverallRadarChart,
    ) => {
      return {
        ...state,
        employeeCompOverallRadarChart: employeeCompOverallRadarChart,
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
                this.setEmployeeHighestSkills(res.topSkill),
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
                  res.topHighestSkillTargetEmployee,
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
                this.setEmployeeImproveSkills(res.topKeenSkillEmployee),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getEmployeeSkillGapBarChart = this.effect((params$: Observable<IEmployeeAtGlanceParams>) =>
    params$.pipe(
      switchMap(params =>
        this.summaryService.getEmployeeSkillGapBarChart(params).pipe(
          tapResponse({
            next: res => this.setEmployeeSkillGapBarChart(res.skillGapBarChart),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getEmployeeCompetencyPieChart = this.effect((params$: Observable<IEmployeeAtGlanceParams>) =>
    params$.pipe(
      switchMap(params =>
        this.summaryService.getEmployeeCompetencyPieChart(params).pipe(
          tapResponse({
            next: res => this.setEmployeeCompetencyPieChart(res.competencyPieChart),
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

  readonly getEmployeeOverallRadarChart = this.effect(
    (params$: Observable<IEmployeeCompetencyOverallRadarChartParams>) =>
      params$.pipe(
        switchMap(params =>
          this.summaryService.getEmployeeCompetencyOverallRadarChart(params).pipe(
            tapResponse({
              next: res =>
                this.setEmployeeCompOverallRadarChart(
                  res.overallCompetencyRadarChart,
                ),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
}
