import { Injectable } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CREATE_EVALUATION_CYCLE, GET_EVALUATE_CYCLE_OVERALL } from '../constants/evaluation-cycle.constant';
import { IEvaluateCycleInput, IEvaluationCycleOverallApiResponse } from '../models/evaluation-cycle.model';

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

  addEvaluationCycle(
    evaluationCycleInput: IEvaluateCycleInput,
  ): Observable<MutationResult<boolean>> {
    return this.apollo.mutate<boolean>({
      mutation: CREATE_EVALUATION_CYCLE,
      variables: { input: evaluationCycleInput },
    })
  }
}
