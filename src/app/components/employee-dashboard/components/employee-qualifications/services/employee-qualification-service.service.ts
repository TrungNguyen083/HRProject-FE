import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_EMPLOYEE_QUALIFICATIONS } from '../constants/employee-qualifications.constant';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
import { IQualificationApiResponse } from '../models/employee-qualification.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeQualificationService {
  constructor(private apollo: Apollo, private authService: AuthService, private http: HttpClient) {}

  getEmployeeQualifications(
    employeeId: number,
  ): Observable<IQualificationApiResponse> {
    return this.apollo
      .watchQuery<IQualificationApiResponse>({
        query: GET_EMPLOYEE_QUALIFICATIONS,
        variables: { employeeId },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  uploadQualification(id: number, file: File, title: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', "QUALIFICATION");
    formData.append("title", title)

    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      `${environment.apiUrl}/dam/upload/${id}`,
      formData,
      { headers, responseType: 'text' },
    );
  }
}
