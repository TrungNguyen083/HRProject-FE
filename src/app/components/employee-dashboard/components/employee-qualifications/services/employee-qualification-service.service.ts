import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { IEmployeeQualificationsApiResponse } from '../models/employee-qualification.model';
import { GET_EMPLOYEE_QUALIFICATIONS } from '../constants/employee-qualifications.constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeeQualificationService {
  constructor(private apollo: Apollo) {}

  getEmployeeQualifications(
    employeeId: number,
  ): Observable<IEmployeeQualificationsApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeQualificationsApiResponse>({
        query: GET_EMPLOYEE_QUALIFICATIONS,
        variables: { employeeId },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
