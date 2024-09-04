import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { barChartNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { HrOverviewStore } from '../../stores/hr-overview.store';
import { HrDashboardShareStore } from 'src/app/components/hr-dashboard/store/hr-dashboard-share-store.service';
import { IBarChartDTO, IDiffPercentDTO, IHrOverviewParams } from '../../models/hr-overview.model';

@Component({
  selector: 'hr-overview-competency',
  templateUrl: './hr-overview-competency.component.html',
  styleUrls: ['./hr-overview-competency.component.scss'],
})
export class HrOverviewCompetencyComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = barChartNoGridOptions;
  params: IHrOverviewParams = {
    cycleId: 0
  }
  competencyDiff: IDiffPercentDTO = {
    first: 0.0,
    second: 0.0,
    diffPercent: 0.0,
    isIncreased: true
  };

  constructor(private hrOverviewStore: HrOverviewStore, private hrDashboardStore: HrDashboardShareStore) { }


  ngOnInit(): void {
    this.hrDashboardStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId };

      this.hrOverviewStore.getCompetencyOverviewChart(this.params);
      this.hrOverviewStore.competencyOverviewChart$.subscribe(res => {
        if (!res) return;
        this.initChart(res);
      })

      this.hrOverviewStore.getCompetencyDiffPercent(this.params);
      this.hrOverviewStore.competencyDiffPercent$.subscribe(res => {
        if (!res) return;
        this.competencyDiff = res;
      })
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
