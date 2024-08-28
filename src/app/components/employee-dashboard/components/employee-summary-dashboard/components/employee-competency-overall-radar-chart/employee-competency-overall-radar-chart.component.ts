import { Component, OnInit } from '@angular/core';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import {ChartOptions, ChartData} from "chart.js"
import { radarChartOptions } from 'src/app/components/share/constants/chart.constant';
import { EmployeeDashboardStore } from 'src/app/components/employee-dashboard/store/employee-dashboard-store.service';
import { EplSummaryDashboardStore } from '../../store/epl-summary-dashboard-store.service';
import { IEmployeeCompetencyOverallRadarChartParams } from '../../models/employee-summary-dashboard';
@Component({
  selector: 'employee-competency-overall-radar-chart',
  templateUrl: './employee-competency-overall-radar-chart.component.html',
  styleUrls: ['./employee-competency-overall-radar-chart.component.scss'],
})
export class EmployeeCompetencyOverallRadarChartComponent implements OnInit {
  options: ChartOptions = radarChartOptions;
  data!: ChartData;
  params: IEmployeeCompetencyOverallRadarChartParams = {
    employeeId: 0,
    evaluateCycleId: 0
  }

  constructor(private summaryStore: EplSummaryDashboardStore,
    private eDashboardStore: EmployeeDashboardStore) { }

  ngOnInit(): void {

    this.eDashboardStore.employeeId$.subscribe(employeeId => {
      if (!employeeId) return;
      this.params = {...this.params, employeeId};

      this.eDashboardStore.previousCycle$.subscribe(evaluateCycleId => {
        if (!evaluateCycleId) return;
        this.params = {...this.params, evaluateCycleId}
  
        this.initEmployeeOverallRadarChart();
      });
    });
  }

  private initEmployeeOverallRadarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.summaryStore.getEmployeeOverallRadarChart(this.params);
    this.summaryStore.employeeCompOverallRadarChart$.subscribe(res => {
      this.data = {
        labels: res.labels,
        datasets: res.datasets.map((dataset, index) => {
          const colorConfig = [
            {
              borderColor: colorObj.primary,
              pointBackgroundColor: colorObj.primary,
              pointBorderColor: colorObj.primary,
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: colorObj.primary,
            },
            {
              borderColor: colorObj.primaryLight2,
              pointBackgroundColor: colorObj.primaryLight2,
              pointBorderColor: colorObj.primaryLight2,
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: colorObj.primaryLight2,
            },
            {
              borderColor: colorObj.primaryLight3,
              pointBackgroundColor: colorObj.primaryLight3,
              pointBorderColor: colorObj.primaryLight3,
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: colorObj.primaryLight3,
            },
          ];

          return {
            label: dataset.lineName,
            ...colorConfig[index],
            data: dataset.dataset,
          };
        }),
      };
    });
  }
}
