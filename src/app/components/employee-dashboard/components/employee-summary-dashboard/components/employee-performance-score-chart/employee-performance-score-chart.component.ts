import { Component, OnInit } from '@angular/core';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { ChartOptions, ChartData } from 'chart.js';
import { barChartWithLineOptions } from 'src/app/components/share/constants/chart.constant';
import { EplSummaryDashboardStore } from '../../store/epl-summary-dashboard-store.service';
import _ from 'lodash';
@Component({
  selector: 'employee-performance-score-chart',
  templateUrl: './employee-performance-score-chart.component.html',
  styleUrls: ['./employee-performance-score-chart.component.scss'],
})
export class EmployeePerformanceScoreChartComponent implements OnInit {
  options: ChartOptions = barChartWithLineOptions;
  data!: ChartData;
  labels: string[] = [];
  scores: number[] = [];

  constructor(private eplSummaryStore: EplSummaryDashboardStore) {}

  ngOnInit(): void {
    this.eplSummaryStore.getEmployeePerformanceRating(4);
    this.eplSummaryStore.employeePerformanceRating$.subscribe(res => {
      this.labels = _.map(res.data, 'label');
      this.scores = _.map(res.data, 'score');
      this.initChartData();
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
          data: this.scores,
        },
        {
          type: 'bar',
          label: 'Performance',
          backgroundColor: colorObj.primary,
          data: this.scores,
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };
  }
}
