import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { configPagination } from 'src/app/utils/configPagination';
import { IPerformanceEvaItem, IPerformanceEvaluationPagingParams } from '../../models/performance-progress.model';
import { evaluationProgressTableCols } from '../../constants/performance-progress.constant';
import { PerformanceProgressStore } from '../../stores/performance-progress.store';
import { SumPerformanceEvaluationStore } from 'src/app/components/sum-performance-evaluation/stores/sum-performance-evaluation.store';

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
  params!: IPerformanceEvaluationPagingParams;
  tableData: HrmsTable<IPerformanceEvaItem> = {
    ...defaultTablePagination,
    data: {
      header: evaluationProgressTableCols,
      body: [],
    },
  };

  constructor(
    private performanceProgressStore: PerformanceProgressStore,
    private sumPerformanceEvaStore: SumPerformanceEvaluationStore
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.sumPerformanceEvaStore.currentCycle$,
      this.sumPerformanceEvaStore.departmentId$
    ]).subscribe(([cycleId, departmentId]) => {
      if (!cycleId || !departmentId) return;

      this.params = { ...this.params, cycleId, departmentId };
      this.performanceProgressStore.getPerformanceProgress(this.params);
      this.performanceProgressStore.getEvaluationTitle(cycleId);
    });

    this.loadTitle();
    this.loadTable();
  }

  loadTitle() {
    this.performanceProgressStore.evaluationTitle$.subscribe(res => {
      if (!res) return;
      this.title = "Performance " + res.title;
      this.status = res.status;
      this.startDate = res.startDate;
      this.dueDate = res.dueDate;
    })
  }

  loadTable() {
    this.performanceProgressStore.performanceEvaluationList$.subscribe(res => {
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
    })
  }


  searchValue(search: string): void {
    this.handleEmployeeParams('name', search);
    this.performanceProgressStore.getPerformanceProgress(this.params);
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
    this.performanceProgressStore.getPerformanceProgress(this.params);
  }
}
