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
    employeeId: 4,
    evaluateCycleId: 0
  }

  constructor(private summaryStore: EplSummaryDashboardStore,
    private eDashboardStore: EmployeeDashboardStore) { }

  ngOnInit(): void {

    this.eDashboardStore.previousCycle$.subscribe(evaluateCycleId => {
      if (!evaluateCycleId) return;
      this.params = {...this.params, evaluateCycleId}

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
      })
    });

    // this.data = {
    //   labels: [
    //     'Problem solving',
    //     'Willingness to learn',
    //     'Communication',
    //     'Team spirit',
    //     'Customer orientation',
    //     'English',
    //     'Job knowledge',
    //     'Work quality',
    //   ],
    //   datasets: [
    //     {
    //       label: 'Self-evaluation',
    //       borderColor: colorObj.primary,
    //       pointBackgroundColor: colorObj.primary,
    //       pointBorderColor: colorObj.primary,
    //       pointHoverBackgroundColor: textColor,
    //       pointHoverBorderColor: colorObj.primary,
    //       data: [3, 4, 1, 3, 2, 1, 3, 4],
    //     },
    //     {
    //       label: 'Supervisor',
    //       borderColor: colorObj.primaryLight2,
    //       pointBackgroundColor: colorObj.primaryLight2,
    //       pointBorderColor: colorObj.primaryLight2,
    //       pointHoverBackgroundColor: textColor,
    //       pointHoverBorderColor: colorObj.primaryLight2,
    //       data: [2, 4, 1, 3, 1, 2, 3, 2],
    //     },
    //     {
    //       label: 'Final score',
    //       borderColor: colorObj.primaryLight3,
    //       pointBackgroundColor: colorObj.primaryLight3,
    //       pointBorderColor: colorObj.primaryLight3,
    //       pointHoverBackgroundColor: textColor,
    //       pointHoverBorderColor: colorObj.primaryLight3,
    //       data: [3, 2, 2, 1, 2, 4, 2, 4],
    //     },
    //   ],
    // };
  }
}
