import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { horizontalStackedBarOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';

@Component({
  selector: 'performance-by-job-level',
  templateUrl: './performance-by-job-level.component.html',
  styleUrls: ['./performance-by-job-level.component.scss'],
})
export class PerformanceByJobLevelComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = horizontalStackedBarOptions;
  plugins = [ChartDataLabels];

  constructor(private shareStore: HrDashboardShareStore) {
    
  }
  
  ngOnInit() {
    this.data = {
      labels: ['Expert', 'Senior Level', 'Professional Level', 'Junior Level'],
      datasets: [
        {
          type: 'bar',
          label: 'Too early to evaluate',
          backgroundColor: colorObj.primary,
          data: [10, 20, 10, 30],
        },
        {
          type: 'bar',
          label: 'Unsatisfactory',
          backgroundColor: colorObj.primaryLight,
          data: [20, 20, 10, 8],
        },
        {
          type: 'bar',
          label: 'Partially meet expectation',
          backgroundColor: colorObj.primaryLight1,
          data: [30, 20, 10, 20],
        },
        {
          type: 'bar',
          label: 'Meet expectation',
          backgroundColor: colorObj.primaryLight4,
          data: [12, 20, 20, 20],
        },
        {
          type: 'bar',
          label: 'Partially exceed expectation',
          backgroundColor: colorObj.primaryLight2,
          data: [8, 12, 30, 10],
        },
        {
          type: 'bar',
          label: 'Oustanding',
          backgroundColor: colorObj.primaryLight3,
          data: [20, 8, 20, 12],
        },
      ],
    };
  }
}
