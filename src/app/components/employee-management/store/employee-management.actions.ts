import { createAction, props } from '@ngrx/store';
import { PaginatedData } from 'src/app/models/global.model';
import { IEmployee, IEmployeeInfo, IEmployeeParams } from '../models/employee-management.model';

export const setLoading = createAction('[Employee] Set Loading', props<{ loading: boolean }>());
export const setEmployees = createAction('[Employee] Set Employees', props<{ employees: PaginatedData<IEmployeeInfo> }>());
export const setEmployee = createAction('[Employee] Set Employee', props<{ employeeInfo: IEmployeeInfo }>());
export const setNewEmployees = createAction('[Employee] Set New Employees', props<{ newEmployees: IEmployeeInfo[] }>());
export const loadEmployees = createAction('[Employee] Load Employees', props<{ params: IEmployeeParams }>());
export const loadEmployeeDetail = createAction('[Employee] Load Employee Detail', props<{ id: number }>());
export const loadNewEmployees = createAction('[Employee] Load New Employees');
export const removeEmployeeDetail = createAction('[Employee] Remove Employee Detail')