import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { IEmployeeSkillsMatrixApiResponse } from '../models/employee-skills.model';
import { GET_EMPLOYEE_SKILLS_MATRIX } from '../constants/employee-skills.constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSkillsService {
  constructor(private apollo: Apollo) {}

  getEmployeeSkillsMatrix(
    employeeId: number,
  ): Observable<IEmployeeSkillsMatrixApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeSkillsMatrixApiResponse>({
        query: GET_EMPLOYEE_SKILLS_MATRIX,
        variables: { employeeId },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
