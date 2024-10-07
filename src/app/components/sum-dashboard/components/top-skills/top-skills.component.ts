import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { topSkillsTableCol } from 'src/app/components/hr-dashboard/constants/hr-dashboard.constants';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { PaginatedData } from 'src/app/models/global.model';
import { configPagination } from 'src/app/utils/configPagination';
import { SumDashboardStore } from '../../stores/sum-dashboard.store';
import { ITopSkill, ITopSkillParams } from '../../models/sum-dashboard.model';


interface TopSkillTableData {
  no: number;
  avgScore: number;
  skill: string;
}
@Component({
  selector: 'top-skills',
  templateUrl: './top-skills.component.html',
  styleUrls: ['./top-skills.component.scss']
})
export class TopSkillsComponent implements OnInit {
  tableData: HrmsTable<TopSkillTableData> = {
    ...defaultTablePagination,
    data: {
      header: topSkillsTableCol,
      body: [],
    },
  };
  params: ITopSkillParams = {
    pageNo: 1,
    pageSize: 5
  };
  isFullTableShown = false;
  gapPageNumber = 1;

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.previousCycle$.subscribe(evaluateCycleId => {
      if (!evaluateCycleId) return;
      this.params = { ...this.params, evaluateCycleId };
    })

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId };

      this.sumDashboardStore.getTopSkills(this.params);
    })

    this.sumDashboardStore.topSkills$.subscribe(res => {
      if (!res) return;
      this.initTable(res);
    })
  }

  initTable(res: PaginatedData<ITopSkill>) {
    const pagination = configPagination(res.pagination);
    const topSkillsets = res.data.map((s, i) => {
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
  }

  showFullTable() {
    this.isFullTableShown = true;
  }
  onPageChange(e: PageChangeEvent): void {
    this.params = {
      ...this.params,
      pageNo: e.page + this.gapPageNumber,
    };
    this.sumDashboardStore.getTopSkills(this.params);
  }
}
