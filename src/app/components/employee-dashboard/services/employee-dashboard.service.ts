import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_EMPLOYEE_ID, GET_EMPLOYEE_OVERVIEW } from '../constants/employee-dashboard.constant';
import { IEmployeeIdApiResponse, IEmployeeOverviewApiResponse } from '../models/employee-dashboard.model';
import { IEvaluateCyclesApiResponse } from '../../hr-dashboard/models/hr-dashboard.model';
import { GET_EVALUATE_CYCLES } from '../../hr-dashboard/constants/hr-dashboard.constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardService {
  constructor(private apollo: Apollo) { }

  getEmployeeOverview(
    employeeId: number,
  ): Observable<IEmployeeOverviewApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeOverviewApiResponse>({
        query: GET_EMPLOYEE_OVERVIEW,
        variables: { employeeId },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEvaluateCycles(): Observable<IEvaluateCyclesApiResponse> {
    return this.apollo
      .watchQuery<IEvaluateCyclesApiResponse>({
        query: GET_EVALUATE_CYCLES,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployeeId(email: string): Observable<IEmployeeIdApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeIdApiResponse>({
        query: GET_EMPLOYEE_ID,
        variables: { email },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
