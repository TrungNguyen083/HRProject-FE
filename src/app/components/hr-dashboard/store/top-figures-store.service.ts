import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { PaginatedData } from 'src/app/models/global.model';
import {
  ITopEmployee,
  ITopEmployeeParams,
  ITopSkill,
  ITopSkillParams,
} from '../models/hr-dashboard.model';
import { HrDashboardService } from '../services/hr-dashboard.service';

export interface ITopFiguresState {
  topPerformers: PaginatedData<ITopEmployee>;
  topSkills: PaginatedData<ITopSkill>;
  topCompetencies: PaginatedData<ITopEmployee>;
}

const defaultPagination = {
  pageNo: 0,
  pageSize: 0,
  totalItems: 0,
  totalPages: 0,
};
@Injectable({
  providedIn: 'root',
})
export class TopFiguresStore extends ComponentStore<ITopFiguresState> {
  constructor(private hrDashboardService: HrDashboardService) {
    super({
      topPerformers: {
        pagination: {
          ...defaultPagination,
        },
        data: [],
      },
      topSkills: {
        pagination: {
          ...defaultPagination,
        },
        data: [],
      },
      topCompetencies: {
        pagination: {
          ...defaultPagination,
        },
        data: [],
      },
    });
  }

  //SELECTOR
  readonly topPerformers$ = this.select(state => state.topPerformers);
  readonly topSkills$ = this.select(state => state.topSkills);
  readonly topCompetencies$ = this.select(state => state.topCompetencies);
  //UPDATER
  readonly setTopPerformers = this.updater(
    (state: ITopFiguresState, topPerformers: PaginatedData<ITopEmployee>) => {
      return {
        ...state,
        topPerformers,
      };
    },
  );
  readonly setTopSkills = this.updater(
    (state: ITopFiguresState, topSkillsets: PaginatedData<ITopSkill>) => {
      return {
        ...state,
        topSkills: topSkillsets,
      };
    },
  );
  readonly setTopCompetencies = this.updater(
    (
      state: ITopFiguresState,
      topCompetencies: PaginatedData<ITopEmployee>,
    ) => {
      return {
        ...state,
        topCompetencies,
      };
    },
  );
  //EFFECT
  readonly getTopPerformers = this.effect(
    (params$: Observable<ITopEmployeeParams>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getTopPerformers(params).pipe(
            tapResponse({
              next: res => this.setTopPerformers(res.topPerformers),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getTopSkills = this.effect(
    (params$: Observable<ITopSkillParams>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getTopSkills(params).pipe(
            tapResponse({
              next: res => {
                this.setTopSkills(res.topSkill)
              },
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getTopCompetencies = this.effect(
    (params$: Observable<ITopEmployeeParams>) =>
      params$.pipe(
        switchMap(params =>
          this.hrDashboardService.getTopCompetencies(params).pipe(
            tapResponse({
              next: res => {
                this.setTopCompetencies(res.topCompetencyRating);
              },
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
}
