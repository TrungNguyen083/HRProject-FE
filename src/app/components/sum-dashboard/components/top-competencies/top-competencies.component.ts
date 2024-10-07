import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { topCompetenciesTableCol } from 'src/app/components/hr-dashboard/constants/hr-dashboard.constants';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { defaultImg, defaultTablePagination } from 'src/app/constants/app.constant';
import { PaginatedData } from 'src/app/models/global.model';
import { configPagination } from 'src/app/utils/configPagination';
import { ITopReview, ITopReviewParams } from '../../models/sum-dashboard.model';
import { SumDashboardStore } from '../../stores/sum-dashboard.store';


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
  styleUrls: ['./top-competencies.component.scss']
})
export class TopCompetenciesComponent implements OnInit {
  tableData: HrmsTable<TopCompetenciesTableData> = {
    ...defaultTablePagination,
    data: {
      header: topCompetenciesTableCol,
      body: [],
    },
  };
  params: ITopReviewParams = { pageNo: 1, pageSize: 5 };
  isFullTableShown = false;
  gapPageNumber = 1;
  defaultImg = defaultImg;

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId };
    })

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId };

      this.sumDashboardStore.getTopCompetencies(this.params);
    })

    this.sumDashboardStore.topCompetencies$.subscribe(res => {
      if(!res) return;
      this.initTable(res);
    })
  }

  initTable(res: PaginatedData<ITopReview>) {
    const pagination = configPagination(res.pagination);
    const topCompetencies = res.data.map((s, i) => {
      return {
        ...s,
        no: i + 1,
        profileImgUrl: s.profileImgUrl,
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
  }

  showFullTable() {
    this.isFullTableShown = true;
  }

  onPageChange(e: PageChangeEvent): void {
    this.params = {
      ...this.params,
      pageNo: e.page + this.gapPageNumber,
    };
    this.sumDashboardStore.getTopCompetencies(this.params);
  }

}
