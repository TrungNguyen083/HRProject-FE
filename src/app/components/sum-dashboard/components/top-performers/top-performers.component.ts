import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { topPerformersTableCol } from 'src/app/components/hr-dashboard/constants/hr-dashboard.constants';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { defaultImg, defaultTablePagination } from 'src/app/constants/app.constant';
import { PaginatedData } from 'src/app/models/global.model';
import { configPagination } from 'src/app/utils/configPagination';
import { ITopReview, ITopReviewParams } from '../../models/sum-dashboard.model';
import { SumDashboardStore } from '../../stores/sum-dashboard.store';

interface TopPerformersTableData {
  no: number;
  id: number;
  firstName: string;
  lastName: string;
  profileImgUrl?: string;
  rating: number;
}

@Component({
  selector: 'top-performers',
  templateUrl: './top-performers.component.html',
  styleUrls: ['./top-performers.component.scss']
})
export class TopPerformersComponent implements OnInit {
  defaultImg = defaultImg;
  tableData: HrmsTable<TopPerformersTableData> = {
    ...defaultTablePagination,
    data: {
      header: topPerformersTableCol,
      body: [],
    },
  };
  popUpTableRef!: DynamicDialogRef;
  params: ITopReviewParams = { pageNo: 1, pageSize: 5 };
  isFullTableShown = false;
  gapPageNumber = 1;

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId };
    })

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId };

      this.sumDashboardStore.getTopPerformers(this.params);
    })

    this.sumDashboardStore.topPerformers$.subscribe(res => {
      if (!res) return;
      this.initTable(res);
    })
  }

  initTable(res: PaginatedData<ITopReview>) {
    const pagination = configPagination(res.pagination);

    const topPerformers = res.data.map((p, i) => {
      return {
        ...p,
        no: i + 1,
        profileImgUrl: this.defaultImg,
      };
    });
    const tData = {
      ...pagination,
      data: {
        header: [...this.tableData.data.header],
        body: _.take(topPerformers, 5),
      },
    };
    this.tableData = tData;
  }

  showFullTable() {
    this.isFullTableShown = true;
  }

  onPageChange(e: PageChangeEvent): void {
    this.params = {
      ...this.params,
      pageNo: e.page + this.gapPageNumber,
    };
    this.sumDashboardStore.getTopPerformers(this.params);
  }
}
