import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { stackedHBarWithNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';

@Component({
  selector: 'hr-overview-star-employees',
  templateUrl: './hr-overview-star-employees.component.html',
  styleUrls: ['./hr-overview-star-employees.component.scss'],
})
export class HrOverviewStarEmployeesComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = stackedHBarWithNoGridOptions;

  ngOnInit(): void {
    this.data = {
      labels: [''],
      datasets: [
        {
          type: 'bar',
          label: 'Front-end Unit',
          backgroundColor: colorObj.primary,
          data: [10],
        },
        {
          type: 'bar',
          label: 'Back-end Unit',
          backgroundColor: colorObj.primaryLight,
          data: [20],
        },
        {
          type: 'bar',
          label: 'Unit C',
          backgroundColor: colorObj.primaryLight1,
          data: [30],
        },
        {
          type: 'bar',
          label: 'Unit D',
          backgroundColor: colorObj.primaryLight4,
          data: [12],
        },
        {
          type: 'bar',
          label: 'Unit E',
          backgroundColor: colorObj.primaryLight2,
          data: [8],
        },
      ],
    };
  }
}
