import { Injectable } from '@angular/core';
import {
  IDepartment,
  IPosition,
} from '../../employee-management/models/employee-management.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { EmployeeManagementService } from '../../employee-management/services/employee-management.service';
import {
  IEvaluateCycle,
  ITimeline,
  IPerformanceByLevel,
  IPerformanceByLevelParams,
  IPotentialPerformance,
  IPotentialPerformanceParams,
} from '../models/hr-dashboard.model';
import { HrDashboardService } from '../services/hr-dashboard.service';

export interface IHRDashboardShareState {
  departments: IDepartment[];
  positions: IPosition[];
  evaluateTimeline: ITimeline[];
  evaluateCycles: IEvaluateCycle[];
  activeCycle: number | null;
  employeesPotentialPerformance: IPotentialPerformance[];
  performanceByJobLevel: IPerformanceByLevel | null;
}

@Injectable({
  providedIn: 'root',
})
export class HrDashboardShareStore extends ComponentStore<IHRDashboardShareState> {
  constructor(
    private employeeMngmentService: EmployeeManagementService,
    private hrDashboardService: HrDashboardService,
  ) {
    super({
      departments: [],
      positions: [],
      evaluateTimeline: [],
      evaluateCycles: [],
      activeCycle: null,
      employeesPotentialPerformance: [],
      performanceByJobLevel: null,
    });
  }

  //SELECTOR
  readonly departments$ = this.select(state => state.departments);
  readonly positions$ = this.select(state => state.positions);
  readonly evaluateTimeline$ = this.select(state => state.evaluateTimeline);
  readonly evaluateCycles$ = this.select(state => state.evaluateCycles);
  readonly activeCycle$ = this.select(state => state.activeCycle);
  readonly employeesPotentialPerformance$ = this.select(state => state.employeesPotentialPerformance);
  readonly performanceByJobLevel$ = this.select(state => state.performanceByJobLevel);  
    
  //UPDATER
  readonly setDepartments = this.updater(
    (state: IHRDashboardShareState, departments: IDepartment[]) => {
      return { ...state, departments };
    },
  );
  readonly setPositions = this.updater(
    (state: IHRDashboardShareState, positions: IPosition[]) => {
      return { ...state, positions };
    },
  );
  readonly setEvaluateTimeline = this.updater(
    (
      state: IHRDashboardShareState,
      evaluateTimeline: ITimeline[],
    ) => {
      return {
        ...state,
        evaluateTimeline,
      };
    },
  );
  readonly setEvaluateCycles = this.updater(
    (state: IHRDashboardShareState, competencyCycles: IEvaluateCycle[]) => {
      return { ...state, competencyCycles };
    },
  );
  readonly setActiveCycle = this.updater(
    (state: IHRDashboardShareState, activeCycle: number | null) => {
      return { ...state, activeCycle };
    },
  );

  readonly setPotentialPerformance = this.updater(
    (
      state: IHRDashboardShareState,
      employeesPotentialPerformance: IPotentialPerformance[],
    ) => {
      return { ...state, employeesPotentialPerformance };
    },
  );

  readonly setPerformanceByLevel = this.updater(
    (
      state: IHRDashboardShareState,
      performanceByJobLevel: IPerformanceByLevel,
    ) => {
      return { ...state, performanceByJobLevel };
    },
  );

  //EFFECT
  readonly getDepartments = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.employeeMngmentService.getDepartments().pipe(
          tapResponse({
            next: res => this.setDepartments(res.departments),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
  readonly getPositions = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.employeeMngmentService.getPositions().pipe(
          tapResponse({
            next: res => this.setPositions(res.positions),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getEvaluateTimeline = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap(params =>
        this.hrDashboardService.getEvaluateTimeline(params).pipe(
          tapResponse({
            next: res => this.setEvaluateTimeline(res.evaluateTimeLine),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
  readonly getEvaluateCycles = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.hrDashboardService.getEvaluateCycles().pipe(
          tapResponse({
            next: res => this.setEvaluateCycles(res.evaluateCycles),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getPotentialPerformance = this.effect(
    (params$: Observable<IPotentialPerformanceParams>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getPotentialPerformance(params).pipe(
            tapResponse({
              next: res =>
                this.setPotentialPerformance(res.employeesPotentialPerformance),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getPerformanceByLevel = this.effect(
    (params$: Observable<IPerformanceByLevelParams>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getPerformanceByLevel(params).pipe(
            tapResponse({
              next: res => {
                this.setPerformanceByLevel(res.performanceByJobLevel);
              },
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
}
