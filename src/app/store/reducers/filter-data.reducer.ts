import { createReducer, on } from '@ngrx/store';
import { IDropdownItem, IPositionDropdownItem } from 'src/app/models/global.model';
import * as FilterDataActions from '../actions/filter-data.actions';

export interface FilterDataState {
  departments: IDropdownItem[];
  positions: IPositionDropdownItem[];
  jobLevels: IDropdownItem[];
}

export const initialState: FilterDataState = {
  departments: [],
  jobLevels: [],
  positions: [],
};

export const filterDataReducer = createReducer(
  initialState,
  on(FilterDataActions.setDepartments, (state, { departments }) => ({
    ...state,
    departments,
  })),
  on(FilterDataActions.setPositions, (state, { positions }) => ({
    ...state,
    positions,
  })),
  on(FilterDataActions.setJobLevels, (state, { jobLevels }) => ({
    ...state,
    jobLevels,
  })),
);
