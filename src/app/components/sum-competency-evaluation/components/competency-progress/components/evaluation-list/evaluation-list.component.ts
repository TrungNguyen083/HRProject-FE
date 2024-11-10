import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { evaluationProgressTableCols } from '../../constants/competency-progress.constant';
import { ICompetencyEvaItem, ICompetencyEvaluationPagingParams, ICompetencyEvaluationTitle } from '../../models/competency-progress.model';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { CompetencyProgressStore } from '../../stores/competency-progress.store';
import { SumCompetencyEvaluationStore } from 'src/app/components/sum-competency-evaluation/stores/sum-competency-evaluation.store';
import { combineLatest } from 'rxjs';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { configPagination } from 'src/app/utils/configPagination';

@Component({
  selector: 'competency-evaluation-list',
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
  params!: ICompetencyEvaluationPagingParams;
  tableData: HrmsTable<ICompetencyEvaItem> = {
    ...defaultTablePagination,
    data: {
      header: evaluationProgressTableCols,
      body: [],
    },
  };

  constructor(
    private competencyProgressStore: CompetencyProgressStore,
    private sumCompetencyEvaStore: SumCompetencyEvaluationStore
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.sumCompetencyEvaStore.currentCycle$,
      this.sumCompetencyEvaStore.departmentId$
    ]).subscribe(([cycleId, departmentId]) => {
      if (!cycleId || !departmentId) return;

      this.params = { ...this.params, cycleId, departmentId };
      this.competencyProgressStore.getCompetencyProgress(this.params);
      this.competencyProgressStore.getEvaluationTitle(cycleId);
    });

    this.loadTitle();
    this.loadTable();
  }

  loadTitle() {
    this.competencyProgressStore.evaluationTitle$.subscribe(res => {
      if (!res) return;
      this.title = "Competency " + res.title;
      this.status = res.status;
      this.startDate = res.startDate;
      this.dueDate = res.dueDate;
    })
  }

  loadTable() {
    this.competencyProgressStore.competencyEvaluationList$.subscribe(res => {
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
    this.competencyProgressStore.getCompetencyProgress(this.params);
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
    this.competencyProgressStore.getCompetencyProgress(this.params);
  }
}
