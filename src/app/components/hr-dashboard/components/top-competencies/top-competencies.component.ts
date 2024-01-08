import { Component, OnInit } from '@angular/core';
import { topCompetenciesTableCol } from '../../constants/hr-dashboard.constants';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import {
  defaultTablePagination,
  defaultImg,
} from '../../../../constants/app.constant';
import { TopFiguresStore } from '../../store/top-figures-store.service';
import { configPagination } from 'src/app/utils/configPagination';
import _ from 'lodash';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { ITopEmployeeParams } from '../../models/hr-dashboard.model';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';

interface TopCompetenciesTableData {
  no: number;
  id: number;
  firstName: string;
  lastName: string;
  profileImgUrl?: string;
  rating: number;
}
@Component({
  selector: 'top-competencies',
  templateUrl: './top-competencies.component.html',
  styleUrls: ['./top-competencies.component.scss'],
})
export class TopCompetenciesComponent implements OnInit {
  tableData: HrmsTable<TopCompetenciesTableData> = {
    ...defaultTablePagination,
    data: {
      header: topCompetenciesTableCol,
      body: [],
    },
  };
  tableParams: ITopEmployeeParams = { cycleId: 0, pageNo: 1, pageSize: 10 };
  topCompetencies$ = this.topFigureStore.topCompetencies$;
  isFullTableShown = false;
  gapPageNumber = 1;
  defaultImg = defaultImg;

  constructor(private topFigureStore: TopFiguresStore, private shareStore: HrDashboardShareStore) {}
  
  ngOnInit(): void {
    this.shareStore.activeCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.tableParams = { ...this.tableParams, cycleId: cycleId };
      this.topFigureStore.getTopCompetencies(this.tableParams);
    });
    //this.topFigureStore.getTopCompetencies(this.tableParams);
    this.topCompetencies$.subscribe(res => {
      const pagination = configPagination(res.pagination);
      const topCompetencies = res.data.map((s, i) => {
        return {
          ...s,
          no: i + 1,
          profileImgUrl: this.defaultImg,
        };
      });

      const tData = {
        ...pagination,
        data: {
          header: [...this.tableData.data.header],
          body: _.take(topCompetencies, 5),
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
    this.topFigureStore.getTopCompetencies(this.tableParams);
  }
}
