import { Injectable } from '@angular/core';
import { EmployeeSkillsService } from '../services/employee-skills.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { IEmployeeSkillMatrix } from '../models/employee-skills.model';
import { Observable, switchMap } from 'rxjs';

interface IEmployeeSkillsState {
  employeeSkillsMatrix: IEmployeeSkillMatrix[];
}
@Injectable({
  providedIn: 'root',
})
export class EmployeeSkillsStore extends ComponentStore<IEmployeeSkillsState> {
  constructor(private employeeSkillService: EmployeeSkillsService) {
    super({
      employeeSkillsMatrix: [],
    });
  }

  readonly employeeSkillsMatrix$: Observable<IEmployeeSkillMatrix[]> =
    this.select(state => state.employeeSkillsMatrix);

  readonly setEmployeeOverview = this.updater(
    (
      state: IEmployeeSkillsState,
      employeeSkillsMatrix: IEmployeeSkillMatrix[],
    ) => {
      return { ...state, employeeSkillsMatrix };
    },
  );
  readonly getEmployeeSkillsMatrix = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap(params =>
        this.employeeSkillService.getEmployeeSkillsMatrix(params).pipe(
          tapResponse({
            next: res => this.setEmployeeOverview(res.employeeSkillMatrix),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
