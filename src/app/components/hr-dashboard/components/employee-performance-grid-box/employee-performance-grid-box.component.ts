import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import _ from 'lodash';
import {
  nineGridLabels,
  nineGridboxOptions,
} from 'src/app/components/share/constants/chart.constant';
import { IDropdownItem } from 'src/app/models/global.model';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';

@Component({
  selector: 'employee-performance-grid-box',
  templateUrl: './employee-performance-grid-box.component.html',
  styleUrls: ['./employee-performance-grid-box.component.scss'],
})
export class EmployeePerformanceGridBoxComponent implements OnInit {
  basicData: ChartData;
  plugins: Plugin[];
  basicOptions: ChartOptions = nineGridboxOptions;
  labels: string[] = [];
  data: { x: number; y: number; image: string }[] = [];
  params = { departmentId: -1, cycleId: 1 };
  pointImages: string[] = []

  constructor(private shareStore: HrDashboardShareStore) {
    this.basicData = {
      labels: [],
      datasets: [
        {
          data: [],
          borderWidth: 1,
          pointRadius: 50,
          pointStyle: (ctx: any) => {
            if (!ctx.raw || !ctx.raw.image) {
              return;
            }
            let pointImage;
            if (this.isTablet()) {
              pointImage = new Image(30, 30);
            } else {
              pointImage = new Image(45, 45);
            }
            pointImage.src = ctx.raw.image;
            return pointImage;
          },
        },
      ],
    };
    this.plugins = [nineGridLabels];
  }

  ngOnInit() {
    this.shareStore.activeCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId: cycleId };
      this.shareStore.getPotentialPerformance(this.params);
    });
    // this.shareStore.getPotentialPerformance(this.params);
    this.shareStore.employeesPotentialPerformance$.subscribe(res => {
      this.labels = _.map(
        res,
        item => item.fullName,
      );

      this.data = _.map(res, item => {
        return {
          x: item.performance,
          y: item.potential,
          image: item.profileImgUri,
        };
      });

      this.initChartData();
    });
  }

  private initChartData(): void {
    const setItem = this.basicData.datasets[0];

    this.basicData = {
      ...this.basicData,
      labels: this.labels,
      datasets: [
        {
          ...setItem,
          data: this.data
        },
      ],
    };
  }
  onSelectDepartment(e: IDropdownItem): void {
    this.params = { ...this.params, departmentId: e.value };
    this.shareStore.getPotentialPerformance(this.params);
  }

  private isTablet(): boolean {
    const screenWidth = window.innerWidth;
    return screenWidth < 1024;
  }
}
