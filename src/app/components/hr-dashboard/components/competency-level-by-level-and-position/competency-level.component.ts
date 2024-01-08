import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ChartComponent } from 'ng-apexcharts/public_api';
import { heatmapChartOptions } from 'src/app/components/share/constants/chart.constant';
import { IDropdownItem } from 'src/app/models/global.model';
import { CompetencyScoreStoreService as CompetencyScoreStore } from '../../store/competency-score-store.service';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';
import { ApexChartOptions } from 'src/app/components/share/models/chart.model';
@Component({
  selector: 'competency-level',
  templateUrl: './competency-level.component.html',
  styleUrls: ['./competency-level.component.scss'],
})
export class CompetencyLevelComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ApexChartOptions = heatmapChartOptions;
  scoreByLevelAndPosition$ = this.competencyScoreStore.scoreByLevelAndPosition$;
  dataSeries: { name: string; data: { x: string; y: number }[] }[] = [];
  params = { positionId: 1, competencyCycleId: 10  };

  constructor(
    private competencyScoreStore: CompetencyScoreStore,
    private shareStore: HrDashboardShareStore,
  ) {}

  ngOnInit(): void {
    this.shareStore.activeCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, competencyCycleId: cycleId };
      this.competencyScoreStore.getScoreByLevelAndPosition(this.params);
    });

    // this.competencyScoreStore.getScoreByLevelAndPosition(this.params);
    this.scoreByLevelAndPosition$.subscribe(result => {
      const series = _(result)
        .groupBy('verticalColumnName')
        .map((values, key) => ({
          name: key,
          data: values.map(({ horizontalColumnName, score }) => ({
            x: horizontalColumnName,
            y: score,
          })),
        }))
        .value();
      this.dataSeries = series;
      this.initHeatmapData();
    });
  }

  onSelectPosition(e: IDropdownItem): void {
    this.params = { ...this.params, positionId: e.value };
    this.competencyScoreStore.getScoreByLevelAndPosition(this.params);
  }

  private initHeatmapData(): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: this.dataSeries,
    };
  }
}
