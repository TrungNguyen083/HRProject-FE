import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { IEmployeeEvaluationApiResponse } from '../models/employee-assessment.model';
import { GET_EMPPLOYEE_EVALUATION } from '../constants/employee-assessment.constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeeAssessmentService {
  constructor(private apollo: Apollo) {}

  getEmployeeEvaluation(
    employeeId: number,
  ): Observable<IEmployeeEvaluationApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeEvaluationApiResponse>({
        query: GET_EMPPLOYEE_EVALUATION,
        variables: { employeeId },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
