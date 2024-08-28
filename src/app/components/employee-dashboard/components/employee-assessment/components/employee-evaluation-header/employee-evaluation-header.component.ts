import { Component, OnInit } from '@angular/core';
import { EmployeeAssessmentStore } from '../../store/employee-assessment-store.service';
import { ICurrentEvaluation } from '../../models/employee-assessment.model';
import { EmployeeDashboardStore } from 'src/app/components/employee-dashboard/store/employee-dashboard-store.service';

@Component({
  selector: 'employee-evaluation-header',
  templateUrl: './employee-evaluation-header.component.html',
  styleUrls: ['./employee-evaluation-header.component.scss']
})
export class EmployeeEvaluationHeaderComponent implements OnInit {
  currentEval!: ICurrentEvaluation;
  constructor(private store: EmployeeAssessmentStore,
    private employeeStore: EmployeeDashboardStore) { }
  ngOnInit(): void {
    this.employeeStore.employeeId$.subscribe(res => {
      if (!res) return;
      this.store.getEmployeeEvaluation(res);
      this.store.currentEvaluation$.subscribe(res => {
        if (!res) return;
        this.currentEval = res;
      });
    });
  }

}
