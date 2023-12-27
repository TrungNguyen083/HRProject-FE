import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { barChartNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
@Component({
  selector: 'hr-overview-performance',
  templateUrl: './hr-overview-performance.component.html',
  styleUrls: ['./hr-overview-performance.component.scss'],
})
export class HrOverviewPerformanceComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = barChartNoGridOptions;

  ngOnInit(): void {
    this.data = {
      labels: ["a", "b", "c", "d", "e"],
      datasets: [
        {
          type: 'bar',
          label: 'Performance',
          backgroundColor: colorObj.primaryLight2,
          data: [3, 4, 5, 1, 2],
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };
  }
}
