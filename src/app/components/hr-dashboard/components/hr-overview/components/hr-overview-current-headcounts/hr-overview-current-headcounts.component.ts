import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { stackedHBarWithNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { IBarChartDTO, IPercentageChangeDTO } from '../../models/hr-overview.model';
import { HrDashboardShareStore } from 'src/app/components/hr-dashboard/store/hr-dashboard-share-store.service';
import { HrOverviewStore } from '../../stores/hr-overview.store';

@Component({
  selector: 'hr-overview-current-headcounts',
  templateUrl: './hr-overview-current-headcounts.component.html',
  styleUrls: ['./hr-overview-current-headcounts.component.scss'],
})
export class HrOverviewCurrentHeadcountsComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = stackedHBarWithNoGridOptions;
  currentHeadCount: IPercentageChangeDTO = {
    data: 0.0,
    diffPercent: 0.0,
    isIncreased: true
  };

  constructor(private hrOverviewStore: HrOverviewStore, private hrDashboardStore: HrDashboardShareStore) { }

  ngOnInit(): void {
    this.hrDashboardStore.previousCycle$.subscribe(cycleId => {
      if (!cycleId) return;

      this.hrOverviewStore.getCurrentHeadcounts(cycleId);
      this.hrOverviewStore.currentHeadcounts$.subscribe(res => {
        if (!res) return;
        this.currentHeadCount = res;
      });

      this.hrOverviewStore.getHeadcountChart();
      this.hrOverviewStore.headcountChart$.subscribe(res => {
        if (!res) return;
        this.initChart(res);
      })
    });
  }

  private initChart(res: IBarChartDTO) {
    this.data = {
      labels: [""],
      datasets: res.items.map((item, index) => ({
        type: 'bar',
        label: item.label,
        backgroundColor: this.getBackgroundColor(index),
        data: [item.value],
      }))
    };
  }

  private getBackgroundColor(index: number): string {
    const colors = [
      colorObj.primary,
      colorObj.primaryLight1,
      colorObj.primaryLight4,
      colorObj.primaryLight2,
    ];
    return colors[index % colors.length];
  }
}
