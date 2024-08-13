import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { configPagination } from 'src/app/utils/configPagination';
import { defaultTablePagination, defaultImg } from '../../../../constants/app.constant';
import { topPerformersTableCol } from '../../constants/hr-dashboard.constants';
import { TopFiguresStore } from '../../store/top-figures-store.service';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';

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
  styleUrls: ['./top-performers.component.scss'],
})
export class TopPerformersComponent implements OnInit {
  defaultImg = defaultImg;
  topPerformers$ = this.topFigureScore.topPerformers$;
  tableData: HrmsTable<TopPerformersTableData> = {
    ...defaultTablePagination,
    data: {
      header: topPerformersTableCol,
      body: [],
    },
  };
  popUpTableRef!: DynamicDialogRef;
  tableParams = { cycleId: 0, pageNo: 1, pageSize: 5 };
  isFullTableShown = false;
  gapPageNumber = 1;

  constructor(
    private topFigureScore: TopFiguresStore,
    private shareStore: HrDashboardShareStore,
  ) {}

  ngOnInit(): void {
    this.shareStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.tableParams = { ...this.tableParams, cycleId: cycleId };
      this.topFigureScore.getTopPerformers(this.tableParams);
    });
    // this.topFigureScore.getTopPerformers(this.tableParams);
    this.topPerformers$.subscribe(result => {
      const pagination = configPagination(result.pagination);

      const topPerformers = result.data.map((p, i) => {
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
    });
  }

  showFullTable() {
    this.isFullTableShown = true;
  }

  onPageChange(e: PageChangeEvent): void {
    this.tableParams = {
      ...this.tableParams,
      pageNo: e.page + this.gapPageNumber,
    };
    this.topFigureScore.getTopSkills(this.tableParams);
  }
}
