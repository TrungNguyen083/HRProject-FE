import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { IQualificationFile } from '../models/employee-qualification.model';
import { EmployeeQualificationService } from '../services/employee-qualification-service.service';

interface IEmployeeQualificationState {
  qualifications: IQualificationFile[];
}
@Injectable({
  providedIn: 'root',
})
export class EmployeeQualificationStore extends ComponentStore<IEmployeeQualificationState> {
  constructor(private eplQualificationService: EmployeeQualificationService) {
    super({
      qualifications: [],
    });
  }

  readonly employeeQualifications$: Observable<IQualificationFile[]> =
    this.select(state => state.qualifications);

  readonly setEmployeeQualifications = this.updater(
    (
      state: IEmployeeQualificationState,
      qualifications: IQualificationFile[],
    ) => {
      return { ...state, qualifications };
    },
  );

  readonly getEmployeeQualifications = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap(params =>
        this.eplQualificationService.getEmployeeQualifications(params).pipe(
          tapResponse({
            next: res => {
              this.setEmployeeQualifications(res.qualifications)
            },
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
