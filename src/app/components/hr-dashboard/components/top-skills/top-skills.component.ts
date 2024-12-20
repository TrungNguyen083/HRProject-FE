import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { configPagination } from 'src/app/utils/configPagination';

import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { defaultTablePagination } from '../../../../constants/app.constant';
import { topSkillsTableCol } from '../../constants/hr-dashboard.constants';
import { ITopSkillParams } from '../../models/hr-dashboard.model';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';
import { TopFiguresStore } from '../../store/top-figures-store.service';

interface TopSkillTableData {
  no: number;
  avgScore: number;
  skill: string;
}
@Component({
  selector: 'top-skills',
  templateUrl: './top-skills.component.html',
  styleUrls: ['./top-skills.component.scss'],
})
export class TopSkillsComponent implements OnInit {
  tableData: HrmsTable<TopSkillTableData> = {
    ...defaultTablePagination,
    data: {
      header: topSkillsTableCol,
      body: [],
    },
  };
  tableParams: ITopSkillParams = {
    pageNo: 1,
    pageSize: 5,
  };
  topSkills$ = this.topFigureStore.topSkills$;
  isFullTableShown = false;
  gapPageNumber = 1;

  constructor(
    private topFigureStore: TopFiguresStore,
    private shareStore: HrDashboardShareStore,
  ) {}

  ngOnInit(): void {
    this.shareStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.tableParams = { ...this.tableParams, evaluateCycleId: cycleId };
      this.topFigureStore.getTopSkills(this.tableParams);
    });
    // this.topFigureStore.getTopSkillsets(this.tableParams);
    this.topSkills$.subscribe(result => {
      const pagination = configPagination(result.pagination);
      const topSkillsets = result.data.map((s, i) => {
        return {
          no: i + 1,
          avgScore: s.value,
          skill: s.label,
        };
      });
      const tData = {
        ...pagination,
        data: {
          header: [...this.tableData.data.header],
          body: _.take(topSkillsets, 5),
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
    this.topFigureStore.getTopSkills(this.tableParams);
  }
}
