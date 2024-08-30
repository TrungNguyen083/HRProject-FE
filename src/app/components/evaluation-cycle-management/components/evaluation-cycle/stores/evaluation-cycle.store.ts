import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs';
import { ICycleOverall } from '../models/evaluation-cycle.model';
import { EvaluateCycleOverallService } from '../services/evaluation-cycle.service';

export interface ICycleOverallState {
    cyclesOverall: ICycleOverall[] | null;
}

@Injectable()
export class CycleOverallStore extends ComponentStore<ICycleOverallState> {
  constructor(private cycleOverallService: EvaluateCycleOverallService) {
    super({
        cyclesOverall: null,
    });
  }

  //SELECTOR
  readonly cyclesOverall$ = this.select(state => state.cyclesOverall);

  //UPDATER
  readonly setCyclesOverall = this.updater(
    (
      state: ICycleOverallState,
      cyclesOverall: ICycleOverall[],
    ) => {
      return {
        ...state,
        cyclesOverall,
      };
    },
  );

  //EFFECTS
  readonly getCyclesOverall = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.cycleOverallService.getCyclesOverall().pipe(
          tapResponse({
            next: res => this.setCyclesOverall(res.cyclesOverall),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
