import { Component, OnInit } from '@angular/core';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { IPromotion, IPromotionParams } from '../../models/evaluation-promotion.model';
import { pomotionTableCols } from '../../constants/evaluation-promotion.constant';
import { EvaluationPromotionStore } from '../../stores/evaluation-promotion.store';
import { configPagination } from 'src/app/utils/configPagination';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {
  cycleTitle!: string
  gapPageNumber = 1;
  params!: IPromotionParams;
  tableData: HrmsTable<IPromotion> = {
    ...defaultTablePagination,
    data: {
      header: pomotionTableCols,
      body: [],
    },
  };

  constructor(
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore,
    private evaluationPromotionStore: EvaluationPromotionStore
  ) { }

  ngOnInit(): void {
    this.hrEvaluationOverviewStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId };
      
      this.evaluationPromotionStore.getPromotionList(this.params);
    });

    this.loadTable();
  }

  loadTable() {
    this.evaluationPromotionStore.promotionList$.subscribe(res => {
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
    this.evaluationPromotionStore.getPromotionList(this.params);
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
    this.evaluationPromotionStore.getPromotionList(this.params);
  }
}
