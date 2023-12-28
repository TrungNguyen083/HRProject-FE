import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EmployeeManagementService } from '../services/employee-management.service';
import * as EmployeeActions from './employee-management.actions';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeManagementService,
  ) {}

  getEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      switchMap(action =>
        this.employeeService.getEmployees(action.params).pipe(
          map(res =>
            EmployeeActions.setEmployees({ employees: res.employees }),
          ),
          catchError(error => {
            console.error(error);
            return of();
          }),
        ),
      ),
    ),
  );

  getEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployeeDetail),
      switchMap(action =>
        this.employeeService.getEmployee(action.id).pipe(
          map(res => EmployeeActions.setEmployee({ employeeInfo: res.employee })),
          catchError(error => {
            console.error(error);
            return of();
          }),
        ),
      ),
    ),
  );

  getNewEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadNewEmployees),
      switchMap(() =>
        this.employeeService.getNewEmployees().pipe(
          map(res =>
            EmployeeActions.setNewEmployees({
              newEmployees: res.newEmployees,
            }),
          ),
          catchError(error => {
            console.error(error);
            return of();
          }),
        ),
      ),
    ),
  );
}
