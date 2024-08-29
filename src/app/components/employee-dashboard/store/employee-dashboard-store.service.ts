import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { IEmployeeOverview } from '../models/employee-dashboard.model';
import { EmployeeDashboardService } from '../services/employee-dashboard.service';
import { IEvaluateCycle } from '../../hr-dashboard/models/hr-dashboard.model';

interface EmployeeDashboardState {
  employeeOverview: IEmployeeOverview | null;
  evaluateCycles: IEvaluateCycle[];
  previousCycle: number | null;
  currentCycle: number | null;
  employeeId: number | null;
  profileImage: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardStore extends ComponentStore<EmployeeDashboardState> {
  constructor(private employeeDashboardService: EmployeeDashboardService) {
    super({
      employeeOverview: null,
      evaluateCycles: [],
      previousCycle: null,
      currentCycle: null,
      employeeId: null,
      profileImage: null,
    });
  }

  readonly employeeOverview$ = this.select(state => state.employeeOverview);
  readonly evaluateCycles$ = this.select(state => state.evaluateCycles);
  readonly previousCycle$ = this.select(state => state.previousCycle);
  readonly currentCycle$ = this.select(state => state.currentCycle);
  readonly employeeId$ = this.select(state => state.employeeId);
  readonly profileImage$ = this.select(state => state.profileImage);

  readonly setEmployeeOverview = this.updater(
    (state: EmployeeDashboardState, employeeOverview: IEmployeeOverview) => {
      return { ...state, employeeOverview };
    },
  );

  readonly setEvaluateCycles = this.updater(
    (state: EmployeeDashboardState, evaluateCycles: IEvaluateCycle[]) => {
      return { ...state, evaluateCycles };
    },
  );
  
  readonly setPreviousCycle = this.updater(
    (state: EmployeeDashboardState, previousCycle: number | null) => {
      return { ...state, previousCycle: previousCycle };
    },
  );

  readonly setCurrentCycle = this.updater(
    (state: EmployeeDashboardState, currentCycle: number | null) => {
      return { ...state, currentCycle: currentCycle };
    },
  );

  readonly setEmployeeId = this.updater(
    (state: EmployeeDashboardState, employeeId: number | null) => {
      return { ...state, employeeId: employeeId };
    },
  );

  readonly setProfileImage = this.updater(
    (state: EmployeeDashboardState, profileImage: string | null) => {
      return { ...state, profileImage: profileImage };
    },
  );

  readonly getEmployeeOverview = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap(params =>
        this.employeeDashboardService.getEmployeeOverview(params).pipe(
          tapResponse({
            next: res => {
              this.setEmployeeOverview(res.employeeOverview);
            },
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getEvaluateCycles = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.employeeDashboardService.getEvaluateCycles().pipe(
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
        this.employeeDashboardService.getEmployeeId(params).pipe(
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

  readonly getProfileImage = this.effect((params$: Observable<string>) =>
    params$.pipe(
      switchMap(params =>
        this.employeeDashboardService.getProfileImage(params).pipe(
          tapResponse({
            next: res => {
              this.setProfileImage(res.profileImage);
            },
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
