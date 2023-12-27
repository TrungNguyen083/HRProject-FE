import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_EMPLOYEE_OVERVIEW } from '../constants/employee-dashboard.constant';
import { IEmployeeOverviewApiResponse } from '../models/employee-dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardService {
  constructor(private apollo: Apollo) {}

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
}
