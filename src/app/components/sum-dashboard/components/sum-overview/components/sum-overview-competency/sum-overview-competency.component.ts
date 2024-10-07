import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { barChartNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { IBarChartDTO, ICycleDepartmentParams, IDiffPercentDTO } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { SumDashboardStore } from 'src/app/components/sum-dashboard/stores/sum-dashboard.store';


@Component({
  selector: 'sum-overview-competency',
  templateUrl: './sum-overview-competency.component.html',
  styleUrls: ['./sum-overview-competency.component.scss']
})
export class SumOverviewCompetencyComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = barChartNoGridOptions;
  params!: ICycleDepartmentParams
  competencyDiff: IDiffPercentDTO = {
    first: 0.0,
    second: 0.0,
    diffPercent: 0.0,
    isIncreased: true
  }

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId }
    })

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId }

      this.sumDashboardStore.getCompetencyOverview(this.params);
      this.sumDashboardStore.getCompetencyDiff(this.params);
    })

    this.sumDashboardStore.competencyOverviewChart$.subscribe(res => {
      if (!res) return;
      this.initChart(res);
    })

    this.sumDashboardStore.competencyDiffPercent$.subscribe(res => {
      if (!res) return;
      this.competencyDiff = res;
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
