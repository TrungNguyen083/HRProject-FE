import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EmployeeManagementService } from 'src/app/components/employee-management/services/employee-management.service';
import * as FilterDataActions from '../actions/filter-data.actions';
import { mapToDropdownOptions } from 'src/app/utils/mapToDropdownOptions';
@Injectable()
export class FilterDataEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeManagementService,
  ) {}

  getDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterDataActions.loadDepartments),
      switchMap(() =>
        this.employeeService.getDepartments().pipe(
          map(res => {
            const departments = mapToDropdownOptions(
              res.departments,
              'departmentName',
              'id',
            );
            return FilterDataActions.setDepartments({ departments });
          }),
          catchError(error => {
            console.error(error);
            return of();
          }),
        ),
      ),
    ),
  );

  getPositions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterDataActions.loadPositions),
      switchMap(() =>
        this.employeeService.getPositions().pipe(
          map(res => {
            const positions = res.positions.map(pos => {
              return {
                label: pos.positionName,
                value: pos.id,
                hasLevel: pos.hasLevel,
                hasDepartment: pos.hasDepartment
              };
            });
            return FilterDataActions.setPositions({ positions });
          }),
          catchError(error => {
            console.error(error);
            return of();
          }),
        ),
      ),
    ),
  );

  getJobLevels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterDataActions.loadJobLevels),
      switchMap(() =>
        this.employeeService.getJobLevels().pipe(
          map(res => {
            const jobLevels = mapToDropdownOptions(
              res.jobLevels,
              'jobLevelName',
              'id',
            );
            return FilterDataActions.setJobLevels({ jobLevels });
          }),
          catchError(error => {
            console.error(error);
            return of();
          }),
        ),
      ),
    ),
  );
}
