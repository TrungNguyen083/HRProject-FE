import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IEvaluationResult, IEvaluationResultParams } from '../../models/evaluation-result.model';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { evaluationProgressTableCols } from '../../constants/evaluation-result.constant';
import { EvaluationResultStore } from '../../stores/evaluation-result.store';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { configPagination } from 'src/app/utils/configPagination';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { PaginatedData } from 'src/app/models/global.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit {
  title!: string
  status!: string
  startDate!: string
  dueDate!: string
  filterForm!: FormGroup;
  gapPageNumber = 1;
  params!: IEvaluationResultParams;
  evaluationOverviewList!: PaginatedData<IEvaluationResult>;
  headerChecked$ = this.evaluationResultStore.headerChecked$;
  selectedEvaIds: number[] = [];
  tableData: HrmsTable<IEvaluationResult> = {
    ...defaultTablePagination,
    data: {
      header: evaluationProgressTableCols,
      body: [],
    },
  };

  constructor(
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore,
    private evaluationResultStore: EvaluationResultStore,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hrEvaluationOverviewStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId };
      
      this.evaluationResultStore.getEvaluationOverviewList(this.params);
      this.evaluationResultStore.getEvaluationTitle(cycleId);
    });

    this.loadTitle();
    this.loadTable();

    this.evaluationResultStore.selectedEvaIds$.subscribe(res => {
      this.selectedEvaIds = res;
    })
  }

  loadTitle() {
    this.evaluationResultStore.evaluationTitle$.subscribe(res => {
      if (!res) return;
      this.title = res.title;
      this.status = res.status;
      this.startDate = res.startDate;
      this.dueDate = res.dueDate;
    })
  }

  loadTable() {
    this.evaluationResultStore.evaluationOverviewList$.subscribe(res => {
      if (!res) return;
      const pagination = configPagination(res.pagination);
      const tData = {
        ...pagination,
        data: {
          header: [...this.tableData.data.header],
          body: res.data,
        },
      };
      this.tableData = tData;
      this.evaluationOverviewList = res;
    })
  }


  searchValue(search: string): void {
    this.handleEmployeeParams('name', search);
    this.evaluationResultStore.getEvaluationOverviewList(this.params);
  }

  handleEmployeeParams(
    key: string,
    value: string | number | Date | string[] | boolean,
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }

  onPageChange(e: PageChangeEvent): void {
    this.handleEmployeeParams('pageNo', e.page + this.gapPageNumber);
    this.params = {
      ...this.params,
    };
    this.evaluationResultStore.getEvaluationOverviewList(this.params);
  }

  handleCheckAll(e: CheckboxChangeEvent) {
    const { checked } = e;
    if (checked) {
      this.evaluationOverviewList.data.forEach((eva) => {
        if (eva.finalStatus !== 'In Progress') {
          this.evaluationResultStore.addEval(eva.employeeId);
        }
      });
    } else {
      this.evaluationResultStore.removeAllEva();
    }
  }

  onCompareEvas() {
    this.router.navigate(['/hr-evaluation-overview/evaluation-compare'], { state: { employeeIds: this.selectedEvaIds } });
  }

  onPromoteEvas() {
    
  }
}
