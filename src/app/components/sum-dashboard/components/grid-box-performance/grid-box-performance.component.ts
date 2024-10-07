import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import _ from 'lodash';
import { IEvaluateCycle, IPotentialPerformance } from 'src/app/components/hr-dashboard/models/hr-dashboard.model';
import {
  nineGridLabels,
  nineGridboxOptions,
} from 'src/app/components/share/constants/chart.constant';
import { IDropdownItem } from 'src/app/models/global.model';
import { SumDashboardStore } from '../../stores/sum-dashboard.store';
import { mapToDropdownOptions } from 'src/app/utils/mapToDropdownOptions';
import { ICycleDepartmentParams } from '../../models/sum-dashboard.model';


@Component({
  selector: 'grid-box-performance',
  templateUrl: './grid-box-performance.component.html',
  styleUrls: ['./grid-box-performance.component.scss']
})
export class GridBoxPerformanceComponent implements OnInit {
  basicData: ChartData;
  plugins: Plugin[];
  basicOptions: ChartOptions = nineGridboxOptions;
  labels: string[] = [];
  data: { x: number; y: number; image: string }[] = [];
  cycles!: IEvaluateCycle[];
  cycleOptions!: IDropdownItem[];
  selectedCycle!: IDropdownItem;
  params!: ICycleDepartmentParams;
  pointImages: string[] = []

  @Output() handleSelectItem = new EventEmitter();

  constructor(private sumDashboardStore: SumDashboardStore) {
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
    this.sumDashboardStore.evaluateCycles$.subscribe(cycles => {
      if (!cycles) return;
      this.cycleOptions = mapToDropdownOptions(
        cycles,
        'evaluateCycleName',
        'id',
      );

      if (!this.cycleOptions.length) return;
      this.selectedCycle = this.cycleOptions[1];

      this.params = { ...this.params, cycleId: this.selectedCycle.value }
    });

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId }

      this.sumDashboardStore.getPotentialPerformance(this.params);
    })

    this.sumDashboardStore.departmentPotentialAndPerformance$.subscribe(res => {
      if (!res) return;
      this.patchChartData(res);
    })
  }

  private patchChartData(res: IPotentialPerformance[]): void {
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

  private isTablet(): boolean {
    const screenWidth = window.innerWidth;
    return screenWidth < 1024;
  }

  onSelectItem() {
    this.handleSelectItem.emit(this.selectedCycle);
    this.params = { ...this.params, cycleId: this.selectedCycle.value }
    this.sumDashboardStore.getPotentialPerformance(this.params);
  }
}
