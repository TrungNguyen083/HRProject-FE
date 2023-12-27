import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee-management.reducer';

const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectEmployees = createSelector(selectEmployeeState, (state) => state.employees);
export const selectLoading = createSelector(selectEmployeeState, (state) => state.loading);
export const selectEmployeeDetail = createSelector(selectEmployeeState, (state) => state.employeeDetail);
export const selectNewEmployees = createSelector(selectEmployeeState, (state) => state.newEmployees);