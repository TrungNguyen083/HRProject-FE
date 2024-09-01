import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { barChartNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';

@Component({
  selector: 'hr-overview-competency',
  templateUrl: './hr-overview-competency.component.html',
  styleUrls: ['./hr-overview-competency.component.scss'],
})
export class HrOverviewCompetencyComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = barChartNoGridOptions;

  ngOnInit(): void {
    this.data = {
      labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      datasets: [
        {
          type: 'bar',
          label: 'Competency',
          backgroundColor: colorObj.primaryLight2,
          data: [3, 4, 5, 1.5, 2, 4, 3, 4.5],
          borderColor: 'white',
          borderWidth: 2,
          barPercentage: 1.2
        },
      ],
    };
  }
}
