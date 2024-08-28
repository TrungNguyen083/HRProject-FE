import { Component, OnInit } from '@angular/core';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { ChartOptions, ChartData } from 'chart.js';
import { barChartWithLineOptions } from 'src/app/components/share/constants/chart.constant';
import { EplSummaryDashboardStore } from '../../store/epl-summary-dashboard-store.service';
import _ from 'lodash';
import { EmployeeDashboardStore } from 'src/app/components/employee-dashboard/store/employee-dashboard-store.service';
@Component({
  selector: 'employee-performance-score-chart',
  templateUrl: './employee-performance-score-chart.component.html',
  styleUrls: ['./employee-performance-score-chart.component.scss'],
})
export class EmployeePerformanceScoreChartComponent implements OnInit {
  options: ChartOptions = barChartWithLineOptions;
  data!: ChartData;
  labels: string[] = [];
  values: number[] = [];

  constructor(private eplSummaryStore: EplSummaryDashboardStore,
    private employeeStore: EmployeeDashboardStore) { }

  ngOnInit(): void {
    this.employeeStore.employeeId$.subscribe(employeeId => {
      if (!employeeId) return;
      this.eplSummaryStore.getEmployeePerformanceRating(employeeId);
      this.eplSummaryStore.employeePerformanceRating$.subscribe(res => {
        this.labels = _.map(res.data, 'label');
        this.values = _.map(res.data, 'value');
        this.initChartData();
      });
    });
  }

  private initChartData(): void {
    this.data = {
      labels: this.labels,
      datasets: [
        {
          type: 'line',
          label: 'Trend',
          borderColor: colorObj.lightGreen,
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: this.values,
        },
        {
          type: 'bar',
          label: 'Performance',
          backgroundColor: colorObj.primary,
          data: this.values,
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };
  }
}
