import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { barChartNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { IBarChartDTO, ICycleDepartmentParams, IDiffPercentDTO } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { SumDashboardStore } from 'src/app/components/sum-dashboard/stores/sum-dashboard.store';

const mockData: IBarChartDTO = {
  title: "zzzzz",
  items: [
    {
      label: "Label 1",
      value: 1
    },
    {
      label: "Label 2",
      value: 2
    },
    {
      label: "Label 3",
      value: 3
    },
    {
      label: "Label 4",
      value: 4
    },
    {
      label: "Label 5",
      value: 5
    },
  ]
}


@Component({
  selector: 'sum-overview-performance',
  templateUrl: './sum-overview-performance.component.html',
  styleUrls: ['./sum-overview-performance.component.scss']
})
export class SumOverviewPerformanceComponent implements OnInit {

  data!: ChartData;
  options: ChartOptions = barChartNoGridOptions;
  params!: ICycleDepartmentParams
  performanceDiff: IDiffPercentDTO = {
    first: 0.0,
    second: 0.0,
    diffPercent: 0.0,
    isIncreased: true
  };

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId }
    })

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId }

      this.sumDashboardStore.getPerformanceOverview(this.params);
      this.sumDashboardStore.getPerformanceDiff(this.params);
    })

    this.sumDashboardStore.performanceOverviewChart$.subscribe(res => {
      if (!res) return;
      this.initChart(res);
    })

    this.sumDashboardStore.performanceDiffPercent$.subscribe(res => {
      if (!res) return;
      this.performanceDiff = res;
    })
  }

  private initChart(res: IBarChartDTO) {
    this.data = {
      labels: res.items.map(item => item.label),
      datasets: [
        {
          type: 'bar',
          label: "Score",
          backgroundColor: colorObj.primaryLight2,
          data: res.items.map(item => item.value),
          borderColor: 'white',
          borderWidth: 2,
          barPercentage: 1.2
        },
      ],
    };
  }

}
