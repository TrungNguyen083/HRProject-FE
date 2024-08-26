import { Component, OnInit } from '@angular/core';
import {
  IEmployeeScoreParams,
  IEmployeeScoreTable,
  IEmployeeSkillScore,
} from './../../models/employee-summary-dashboard';

import { PagingInfo } from 'src/app/components/share/models/pagingInfo.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { configPagination } from 'src/app/utils/configPagination';
import { EplSummaryDashboardStore } from '../../store/epl-summary-dashboard-store.service';
import { EmployeeDashboardStore } from 'src/app/components/employee-dashboard/store/employee-dashboard-store.service';

interface IEmployeeScoreData {
  pagination: PagingInfo;
  data: IEmployeeScoreTable[];
}
@Component({
  selector: 'employee-skill-statistic',
  templateUrl: './employee-skill-statistic.component.html',
  styleUrls: ['./employee-skill-statistic.component.scss'],
})
export class EmployeeSkillStatisticComponent implements OnInit {
  defaultParams: IEmployeeScoreParams = {
    employeeId: 4,
    pageNo: 1,
    pageSize: 5,
  };

  highestSkills: IEmployeeScoreData = this.initializeEmployeeScoreData();
  targetSkills: IEmployeeScoreData = this.initializeEmployeeScoreData();
  improveSkills: IEmployeeScoreData = this.initializeEmployeeScoreData();

  constructor(private summaryStore: EplSummaryDashboardStore,
    private eDashboardStore: EmployeeDashboardStore) { }

  ngOnInit(): void {
    this.eDashboardStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.defaultParams = { ...this.defaultParams, evaluateCycleId: cycleId };
      this.summaryStore.getEmployeeHighestSkills(this.defaultParams);
      this.summaryStore.getEmployeeImproveSkills(this.defaultParams);
      this.summaryStore.getEmployeeTargetSkills(this.defaultParams);
    });

    this.summaryStore.employeeHighestSkills$.subscribe(res => {
      const { pagination, data } = res;
      const customPagination = configPagination(pagination);

      this.highestSkills.data = this.mapSkillsTableData(data);
      this.highestSkills.pagination = customPagination;
    });

    this.summaryStore.employeeImproveSkills$.subscribe(res => {
      const { pagination, data } = res;
      const customPagination = configPagination(pagination);

      this.improveSkills.data = this.mapSkillsTableData(data);
      this.improveSkills.pagination = customPagination;
    });

    this.summaryStore.employeeTargetSkills$.subscribe(res => {
      const { pagination, data } = res;
      const customPagination = configPagination(pagination);

      this.targetSkills.data = this.mapSkillsTableData(data);
      this.targetSkills.pagination = customPagination;
    });
  }
  private initializeEmployeeScoreData(): IEmployeeScoreData {
    return {
      pagination: { ...defaultTablePagination },
      data: [],
    };
  }

  private mapSkillsTableData(data: IEmployeeSkillScore[]) {
    return data.map((s, i) => ({
      no: i + 1,
      score: s.value,
      skillName: s.label,
    }));
  }
}
