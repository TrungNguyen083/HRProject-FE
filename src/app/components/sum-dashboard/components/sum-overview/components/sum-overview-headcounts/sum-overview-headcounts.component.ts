import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { stackedHBarWithNoGridOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { IBarChartDTO, ICycleDepartmentParams, IPercentageChangeDTO } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { SumDashboardStore } from 'src/app/components/sum-dashboard/stores/sum-dashboard.store';


@Component({
  selector: 'sum-overview-headcounts',
  templateUrl: './sum-overview-headcounts.component.html',
  styleUrls: ['./sum-overview-headcounts.component.scss']
})
export class SumOverviewHeadcountsComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = stackedHBarWithNoGridOptions;
  params!: ICycleDepartmentParams
  currentHeadCount: IPercentageChangeDTO = {
    data: 0.0,
    diffPercent: 0.0,
    isIncreased: true
  };

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId };
    })

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId };

      this.sumDashboardStore.getDepartmentHeadcount(this.params);
      this.sumDashboardStore.getDepartmentHeadcountChart(departmentId);
    })

    this.sumDashboardStore.departmentHeadcount$.subscribe(res => {
      if (!res) return;
      this.currentHeadCount = res;
    })

    this.sumDashboardStore.departmentHeadcountChart$.subscribe(res => {
      if (!res) return;
      this.initChart(res);
    })

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
