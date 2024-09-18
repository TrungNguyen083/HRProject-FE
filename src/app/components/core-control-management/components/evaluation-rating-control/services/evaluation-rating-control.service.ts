import { Injectable } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { IPerformanceRangeApiResponse, IPerformanceRangeInput, IProficiencyLevelApiResponse, IProficiencyLevelInput } from '../models/evaluation-rating-control.model';
import { CREATE_PERFORMANCE_RANGE, CREATE_PROFICIENCY_LEVEL, DELETE_PERFORMANCE_RANGE, DELETE_PROFICIENCY_LEVEL, GET_PERFORMANCE_RANGE, GET_PROFICIENCY_LEVELS, UPDATE_PERFORMANCE_RANGE, UPDATE_PROFICIENCY_LEVEL } from '../constants/evaluation-rating-control.constant';


@Injectable({
  providedIn: 'root'
})
export class RatingControlService {
  constructor(private apollo: Apollo) { }

  getProficiencyLevels(): Observable<IProficiencyLevelApiResponse> {
    return this.apollo
      .watchQuery<IProficiencyLevelApiResponse>({
        query: GET_PROFICIENCY_LEVELS
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getPerformanceRanges(): Observable<IPerformanceRangeApiResponse> {
    return this.apollo
      .watchQuery<IPerformanceRangeApiResponse>({
        query: GET_PERFORMANCE_RANGE
      })
      .valueChanges.pipe(map(res => res.data));
  }

  addProficiencyLevel(
    proficiencyLevelInput: IProficiencyLevelInput,
  ): Observable<MutationResult<boolean>> {
    return this.apollo.mutate<boolean>({
      mutation: CREATE_PROFICIENCY_LEVEL,
      variables: { input: proficiencyLevelInput },
    })
  }

  updateProficiencyLevel(
    id: number,
    proficiencyLevelInput: IProficiencyLevelInput,
  ): Observable<MutationResult<boolean>> {
    return this.apollo.mutate<boolean>({
      mutation: UPDATE_PROFICIENCY_LEVEL,
      variables: { id: id, input: proficiencyLevelInput },
    });
  }

  addPerformanceRange(
    performanceRangeInput: IPerformanceRangeInput,
  ): Observable<MutationResult<boolean>> {
    return this.apollo.mutate<boolean>({
      mutation: CREATE_PERFORMANCE_RANGE,
      variables: { input: performanceRangeInput },
    })
  }

  updatePerformanceRange(
    id: number,
    performanceRangeInput: IPerformanceRangeInput,
  ): Observable<MutationResult<boolean>> {
    return this.apollo.mutate<boolean>({
      mutation: UPDATE_PERFORMANCE_RANGE,
      variables: { id: id, input: performanceRangeInput },
    });
  }

  deleteProficiencyLevel(
    id: number,
  ): Observable<MutationResult<boolean>> {
    return this.apollo.mutate<boolean>({
      mutation: DELETE_PROFICIENCY_LEVEL,
      variables: { id: id },
    });
  }

  deletePerformanceRange(
    id: number,
  ): Observable<MutationResult<boolean>> {
    return this.apollo.mutate<boolean>({
      mutation: DELETE_PERFORMANCE_RANGE,
      variables: { id: id },
    });
  }
}
