import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilterDataState } from "../reducers/filter-data.reducer";

const selectFilterDataState = createFeatureSelector<FilterDataState>("filterData")

export const selectDepartments = createSelector(selectFilterDataState, (state) => state.departments)
export const selectPositions = createSelector(selectFilterDataState, (state) => state.positions)
export const selectJobLevels = createSelector(selectFilterDataState, (state) => state.jobLevels)