import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { IEmployeeOverview } from '../models/employee-dashboard.model';
import { EmployeeDashboardService } from '../services/employee-dashboard.service';

interface EmployeeDashboardState {
  employeeOverview: IEmployeeOverview | null;
}
@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardStore extends ComponentStore<EmployeeDashboardState> {
  constructor(private employeeDashboardService: EmployeeDashboardService) {
    super({
      employeeOverview: null,
    });
  }

  readonly employeeOverview$ = this.select(state => state.employeeOverview);

  readonly setEmployeeOverview = this.updater(
    (state: EmployeeDashboardState, employeeOverview: IEmployeeOverview) => {
      return { ...state, employeeOverview };
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
}
