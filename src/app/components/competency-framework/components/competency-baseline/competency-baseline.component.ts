import { Component, OnInit, ViewChild } from '@angular/core';
import { IPositionLevel } from './models/competency-baseline.model';
import * as _ from 'lodash';
import { ChartComponent } from 'ng-apexcharts';
import { ApexChartOptions } from 'src/app/components/share/models/chart.model';
import { heatmapChartOptions } from 'src/app/components/share/constants/chart.constant';
import { IHeatMapDTO } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { CompetencyBaselineStore } from './stores/competency-baseline.store';

const heatMapData: IHeatMapDTO[] = [
  { horizontalColumnName: "Employee A", verticalColumnName: "Skill 1", score: 75 },
  { horizontalColumnName: "Employee A", verticalColumnName: "Skill 2", score: 85 },
  { horizontalColumnName: "Employee A", verticalColumnName: "Skill 3", score: 90 },
  { horizontalColumnName: "Employee B", verticalColumnName: "Skill 1", score: 60 },
  { horizontalColumnName: "Employee B", verticalColumnName: "Skill 2", score: 78 },
  { horizontalColumnName: "Employee B", verticalColumnName: "Skill 3", score: 88 },
  { horizontalColumnName: "Employee C", verticalColumnName: "Skill 1", score: 92 },
  { horizontalColumnName: "Employee C", verticalColumnName: "Skill 2", score: 81 },
  { horizontalColumnName: "Employee C", verticalColumnName: "Skill 3", score: 76 },
  { horizontalColumnName: "Employee D", verticalColumnName: "Skill 1", score: 69 }
];


@Component({
  selector: 'app-competency-baseline',
  templateUrl: './competency-baseline.component.html',
  styleUrls: ['./competency-baseline.component.scss']
})
export class CompetencyBaselineComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ApexChartOptions = heatmapChartOptions;
  dataSeries: { name: string; data: { x: string; y: number }[] }[] = [];
  positionLevels!: IPositionLevel[];
  selectedPositionLevelId!: number;

  constructor(private competencyBaselineStore: CompetencyBaselineStore) { }

  ngOnInit(): void {
    this.competencyBaselineStore.getPositionOption("");
    this.competencyBaselineStore.positionOption$.subscribe(res => {
      if (!res || res.length === 0) return;
      this.positionLevels = res;
      const firstPositionLevelId = this.positionLevels[0].positionId;
      this.onSelectPositionLevel(firstPositionLevelId);
    })
    this.loadChart();
  }

  onSelectPositionLevel(positionId: number): void {
    this.selectedPositionLevelId = positionId;
    this.competencyBaselineStore.getCompetencyBaseline(positionId);
  }

  loadChart() {
    this.competencyBaselineStore.competencyBaseLine$.subscribe(res => {
      if (!res) return;
      const series = _(res)
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
    })
  }

  private initHeatmapData(): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: this.dataSeries,
    };
  }

  searchValue(search: string): void {
    this.competencyBaselineStore.getPositionOption(search);
  }
}
