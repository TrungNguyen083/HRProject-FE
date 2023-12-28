import { Injectable } from '@angular/core';
import {
  IDepartment,
  IEmployee,
  IEmployeeInfo,
  IEmployeeParams,
  IJobLevel,
  IPosition,
} from '../models/employee-management.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { EmployeeManagementService } from '../services/employee-management.service';
import { PaginatedData } from 'src/app/models/global.model';

export interface IEmployeeMngmentState {
  employees: PaginatedData<IEmployeeInfo>;
  loading: boolean;
  employeeDetail: IEmployeeInfo | null;
  departments: IDepartment[];
  newEmployees: IEmployeeInfo[];
  positions: IPosition[];
  jobLevels: IJobLevel[];
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeStore extends ComponentStore<IEmployeeMngmentState> {
  constructor(private employeeMngmentService: EmployeeManagementService) {
    super({
      employees: {
        pagination: {
          pageNo: 0,
          pageSize: 0,
          totalItems: 0,
          totalPages: 0,
        },
        data: [],
      },
      loading: false,
      employeeDetail: null,
      departments: [],
      newEmployees: [],
      positions: [],
      jobLevels: [],
    });
  }

  //SELECTOR
  readonly employees$ = this.select(state => state.employees);
  readonly employeeDetail$ = this.select(state => state.employeeDetail);
  readonly departments$ = this.select(state => state.departments);
  readonly newEmployee$ = this.select(state => state.newEmployees);
  readonly positions$ = this.select(state => state.positions);
  readonly jobLevels$ = this.select(state => state.jobLevels);
  //UPDATER
  readonly setLoading = this.updater(
    (state: IEmployeeMngmentState, loading: boolean) => {
      return {
        ...state,
        loading,
      };
    },
  );
  readonly setEmployees = this.updater(
    (state: IEmployeeMngmentState, employees: PaginatedData<IEmployeeInfo>) => {
      return {
        ...state,
        employees,
      };
    },
  );
  readonly setEmployee = this.updater(
    (state: IEmployeeMngmentState, employeeInfo: IEmployeeInfo) => {
      return { ...state, employeeDetail: employeeInfo };
    },
  );
  readonly setDepartments = this.updater(
    (state: IEmployeeMngmentState, departments: IDepartment[]) => {
      return { ...state, departments };
    },
  );
  readonly setNewEmployees = this.updater(
    (state: IEmployeeMngmentState, newEmployees: IEmployeeInfo[]) => {
      return { ...state, newEmployees };
    },
  );
  readonly setPositions = this.updater(
    (state: IEmployeeMngmentState, positions: IPosition[]) => {
      return { ...state, positions };
    },
  );
  readonly setJobLevels = this.updater(
    (state: IEmployeeMngmentState, jobLevels: IJobLevel[]) => {
      return { ...state, jobLevels };
    },
  );
  //EFFECTS
  readonly getEmployees = this.effect((params$: Observable<IEmployeeParams>) =>
    params$.pipe(
      switchMap(params =>
        this.employeeMngmentService.getEmployees(params).pipe(
          tapResponse({
            next: res => this.setEmployees(res.employees),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getEmployee = this.effect((id$: Observable<number>) =>
    id$.pipe(
      switchMap(id =>
        this.employeeMngmentService.getEmployee(id).pipe(
          tapResponse({
            next: res => {
              if (res.employee !== null) {
                this.setEmployee(res.employee);
              }
            },
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

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

  readonly getNewEmployees = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.employeeMngmentService.getNewEmployees().pipe(
          tapResponse({
            next: res => this.setNewEmployees(res.newEmployees),
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

  readonly getJobLevels = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.employeeMngmentService.getJobLevels().pipe(
          tapResponse({
            next: res => this.setJobLevels(res.jobLevels),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
