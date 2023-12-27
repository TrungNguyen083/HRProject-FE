import { Component, OnInit } from '@angular/core';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  donutChartOptions,
  verticalStackedBarOptions,
} from 'src/app/components/share/constants/chart.constant';
import { ChartOptions, ChartData } from 'chart.js';
import { DonutChartOptions } from 'src/app/components/share/models/chart.model';
@Component({
  selector: 'employee-at-glance',
  templateUrl: './employee-at-glance.component.html',
  styleUrls: ['./employee-at-glance.component.scss'],
})
export class EmployeeAtGlanceComponent implements OnInit {
  barOptions: ChartOptions = verticalStackedBarOptions;
  barData!: ChartData;
  pieData!: ChartData;
  pieOptions: DonutChartOptions = {
    ...donutChartOptions,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  plugins = [ChartDataLabels];

  ngOnInit(): void {
    this.barData = {
      labels: ['Current', 'Target'],
      datasets: [
        {
          type: 'bar',
          label: 'Current',
          backgroundColor: colorObj.primaryLight4,
          data: [4.2, 4.5],
        },

        {
          type: 'bar',
          label: 'Target',
          backgroundColor: colorObj.primaryLight,
          data: [0.8, 0.5],
        },
      ],
    };

    this.pieData = {
      labels: ['Completed', 'Incompleted'],
      datasets: [
        {
          data: [93, 7],
          backgroundColor: [colorObj.primaryLight4, colorObj.primaryLight],
          hoverBackgroundColor: [colorObj.primaryLight4, colorObj.primaryLight],
        },
      ],
    };
  }
}
