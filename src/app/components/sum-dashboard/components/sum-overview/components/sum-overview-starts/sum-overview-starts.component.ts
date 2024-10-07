import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { stackedHBarWithNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';

@Component({
  selector: 'sum-overview-starts',
  templateUrl: './sum-overview-starts.component.html',
  styleUrls: ['./sum-overview-starts.component.scss']
})
export class SumOverviewStartsComponent {
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
