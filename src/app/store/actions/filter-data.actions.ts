import { createAction, props } from '@ngrx/store';
import { IDropdownItem, IPositionDropdownItem } from 'src/app/models/global.model';

export const setDepartments = createAction(
  '[FilterData] Set Departments',
  props<{ departments: IDropdownItem[] }>(),
);
export const setPositions = createAction(
  '[FilterData] Set Positions',
  props<{ positions: IPositionDropdownItem[] }>(),
);
export const setJobLevels = createAction(
  '[FilterData] Set Job Levels',
  props<{ jobLevels: IDropdownItem[] }>(),
);
export const loadDepartments = createAction('[FilterData] Load Departments');
export const loadPositions = createAction('[FilterData] Load Positions');
export const loadJobLevels = createAction('[FilterData] Load Job Levels');
