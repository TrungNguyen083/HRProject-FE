import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { IPerformanceRangeApiResponse, IProficiencyLevelApiResponse } from '../models/evaluation-rating-control.model';
import { GET_PERFORMANCE_RANGE, GET_PROFICIENCY_LEVELS } from '../constants/evaluation-rating-control.constant';


@Injectable({
  providedIn: 'root'
})
export class RatingControlService {
  constructor(private apollo: Apollo) {}

  getProficiencyLevels(): Observable<IProficiencyLevelApiResponse>{
    return this.apollo
      .watchQuery<IProficiencyLevelApiResponse>({
        query: GET_PROFICIENCY_LEVELS
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getPerformanceRanges(): Observable<IPerformanceRangeApiResponse>{
    return this.apollo
      .watchQuery<IPerformanceRangeApiResponse>({
        query: GET_PERFORMANCE_RANGE
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
