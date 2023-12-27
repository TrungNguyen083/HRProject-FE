import { Component, OnInit } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { evaluationHistoryTableCol } from '../../constants/employee-assessment.constant';
import { MenuItem } from 'primeng/api';
import { EmployeeAssessmentStore } from '../../store/employee-assessment-store.service';

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

  menuItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      // routerLink: `detail/${newEmployee.id}`,
      // queryParams: { mode: 'edit' },
    },
  ];
  constructor(private store: EmployeeAssessmentStore){}
  ngOnInit(): void {
    this.store.getEmployeeEvaluation(4)
    this.store.historyEvaluation$.subscribe(data => {
      this.tableData = {
        ...defaultTablePagination,
        data: {
          header: [...this.tableData.data.header],
          body: data
        }
      }
    })
  }
}
