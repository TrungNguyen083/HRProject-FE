import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_EVALUATE_CYCLE_OVERALL } from '../constants/evaluation-cycle.constant';
import { IEvaluationCycleOverallApiResponse } from '../models/evaluation-cycle.model';

@Injectable({
  providedIn: 'root',
})
export class EvaluateCycleOverallService {
  constructor(private apollo: Apollo) {}

  getCyclesOverall(): Observable<IEvaluationCycleOverallApiResponse> {
    return this.apollo
      .watchQuery<IEvaluationCycleOverallApiResponse>({
        query: GET_EVALUATE_CYCLE_OVERALL
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
