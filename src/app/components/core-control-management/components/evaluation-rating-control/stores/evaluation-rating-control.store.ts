import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs';
import { IPerformanceRange, IProficiencyLevel } from '../models/evaluation-rating-control.model';
import { RatingControlService } from '../services/evaluation-rating-control.service';

export interface IRatingControlState {
    proficiencyLevels: IProficiencyLevel[] | null;
    performanceRanges: IPerformanceRange[] | null;
}

@Injectable()
export class RatingControlStore extends ComponentStore<IRatingControlState> {
  constructor(private ratingControlService: RatingControlService) {
    super({
      proficiencyLevels: null,
      performanceRanges: null,
    });
  }

  //SELECTOR
  readonly proficiencyLevels$ = this.select(state => state.proficiencyLevels);
  readonly performanceRanges$ = this.select(state => state.performanceRanges);

  //UPDATER
  readonly setProficiencyLevels = this.updater(
    (
      state: IRatingControlState,
      proficiencyLevels: IProficiencyLevel[],
    ) => {
      return {
        ...state,
        proficiencyLevels,
      };
    },
  );

  readonly setPerformanceRanges = this.updater(
    (
      state: IRatingControlState,
      performanceRanges: IPerformanceRange[],
    ) => {
      return {
        ...state,
        performanceRanges,
      };
    },
  );

  //EFFECTS
  readonly getProficiencyLevels = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.ratingControlService.getProficiencyLevels().pipe(
          tapResponse({
            next: res => this.setProficiencyLevels(res.proficiencyLevels),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getPerformanceRanges = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.ratingControlService.getPerformanceRanges().pipe(
          tapResponse({
            next: res => this.setPerformanceRanges(res.performanceRanges),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
