import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment';
import {
  ADD_EMPLOYEE,
  GET_DEPARTMENTS,
  GET_EMPLOYEE,
  GET_EMPLOYEES,
  GET_JOB_LEVELS,
  GET_NEW_EMPLOYEES,
  GET_POSITIONS,
  UPDATE_EMPLOYEE,
} from '../constants/employee-management.constant';
import {
  IAddEmployeeApiResponse,
  IDepartmentApiResponse,
  IEmployeeApiResponse,
  IEmployeeDetailApiResponse,
  IAddEmployee,
  IEmployeeParams,
  IJobLevelApiResponse,
  INewEmployeeApiResponse,
  IPositionApiResponse,
  IUpdateEmployee,
} from '../models/employee-management.model';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class EmployeeManagementService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getEmployees(params: IEmployeeParams): Observable<IEmployeeApiResponse> {
    // return from([mockData]);
    return this.apollo
      .watchQuery<IEmployeeApiResponse>({
        query: GET_EMPLOYEES,
        variables: params,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getEmployee(id: number): Observable<IEmployeeDetailApiResponse> {
    return this.apollo
      .watchQuery<IEmployeeDetailApiResponse>({
        query: GET_EMPLOYEE,
        variables: { id },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  updateEmployee(employee: IUpdateEmployee) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { input: employee },
    });
  }

  addEmployee(
    employee: IAddEmployee,
  ): Observable<MutationResult<IAddEmployeeApiResponse>> {
    return this.apollo.mutate<IAddEmployeeApiResponse>({
      mutation: ADD_EMPLOYEE,
      variables: { input: employee },
    });
  }

  getDepartments(): Observable<IDepartmentApiResponse> {
    return this.apollo
      .watchQuery<IDepartmentApiResponse>({
        query: GET_DEPARTMENTS,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getNewEmployees(): Observable<INewEmployeeApiResponse> {
    return this.apollo
      .watchQuery<INewEmployeeApiResponse>({
        query: GET_NEW_EMPLOYEES,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getPositions(): Observable<IPositionApiResponse> {
    return this.apollo
      .watchQuery<IPositionApiResponse>({
        query: GET_POSITIONS,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getJobLevels(): Observable<IJobLevelApiResponse> {
    return this.apollo
      .watchQuery<IJobLevelApiResponse>({
        query: GET_JOB_LEVELS,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  uploadProfileImage(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', "PROFILE_IMAGE");

    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      `${environment.apiUrl}/dam/upload/${id}`,
      formData,
      { headers, responseType: 'text' },
    );
  }
}
