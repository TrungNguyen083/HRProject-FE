import { createFeature, createReducer, on } from '@ngrx/store';
import { PaginatedData } from 'src/app/models/global.model';
import {
  IEmployee, IEmployeeInfo
} from '../models/employee-management.model';
import * as EmployeeActions from './employee-management.actions';

export interface EmployeeState {
  employees: PaginatedData<IEmployeeInfo>;
  loading: boolean;
  employeeDetail: IEmployeeInfo | null;
  newEmployees: IEmployeeInfo[];
}

export const initialState: EmployeeState = {
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
  newEmployees: [],
};

export const employeeFeature = createFeature({
  name: 'employeeManagement',
  reducer: createReducer(
    initialState,
    on(EmployeeActions.setLoading, (state, { loading }) => ({
      ...state,
      loading,
    })),
    on(EmployeeActions.setEmployees, (state, { employees }) => ({
      ...state,
      employees,
    })),
    on(EmployeeActions.setEmployee, (state, { employeeInfo }) => ({
      ...state,
      employeeDetail: employeeInfo,
    })),
    on(EmployeeActions.setNewEmployees, (state, { newEmployees }) => ({
      ...state,
      newEmployees,
    })),
    on(EmployeeActions.removeEmployeeDetail, (state) => ({
      ...state,
      employeeDetail: null
    }))
  ),
});

export const { name, reducer: employeeesReducer } = employeeFeature;
