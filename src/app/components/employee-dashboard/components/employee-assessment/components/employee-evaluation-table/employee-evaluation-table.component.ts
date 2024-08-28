import { Component, OnInit } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { evaluationHistoryTableCol } from '../../constants/employee-assessment.constant';
import { MenuItem } from 'primeng/api';
import { EmployeeAssessmentStore } from '../../store/employee-assessment-store.service';
import { EmployeeDashboardStore } from 'src/app/components/employee-dashboard/store/employee-dashboard-store.service';

@Component({
  selector: 'employee-evaluation-table',
  templateUrl: './employee-evaluation-table.component.html',
  styleUrls: ['./employee-evaluation-table.component.scss'],
})
export class EmployeeEvaluationTableComponent implements OnInit {

  tableData: HrmsTable<unknown> = {
    ...defaultTablePagination,
    data: {
      header: evaluationHistoryTableCol,
      body: [],
    },
  };

  constructor(private store: EmployeeAssessmentStore,
    private employeeStore: EmployeeDashboardStore) { }
  ngOnInit(): void {
    this.employeeStore.employeeId$.subscribe(empId => {
      if (!empId) return;
      this.store.getEmployeeEvaluation(empId)
      this.store.historyEvaluation$.subscribe(he => {
        if (!he) return;
        this.tableData = {
          ...defaultTablePagination,
          data: {
            header: [...this.tableData.data.header],
            body: he
          }
        }
      });
    });
  }
}
