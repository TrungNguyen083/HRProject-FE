import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';
import {
  donutChartOptions,
  multipleHorizontalBarOptions,
} from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { CompetencyCycleStore } from '../../store/competency-cycle-store.service';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';
import { DonutChartOptions } from 'src/app/components/share/models/chart.model';
@Component({
  selector: 'competency-review-cycle',
  templateUrl: './competency-review-cycle.component.html',
  styleUrls: ['./competency-review-cycle.component.scss'],
})
export class CompetencyReviewCycleComponent implements OnInit {
  date!: Date;
  barChartData!: ChartData;
  barChartOptions: ChartOptions = multipleHorizontalBarOptions;
  pieData!: ChartData;
  pieOptions: DonutChartOptions = donutChartOptions;
  plugins = [ChartDataLabels];
  cycleStatus$ = this.competencyCycleStore.cycleStatus$;
  barChartLabel: string[] = [];
  selfEvalData: number[] = [];
  managerEvalData: number[] = [];
  pieLabels: string[] = [];
  pieChartData: number[] = [];
  completionPercentage = 0;
  cycleId!: number;
  loading$ = this.competencyCycleStore.loading$
  loading = false;

  constructor(
    private competencyCycleStore: CompetencyCycleStore,
    private shareStore: HrDashboardShareStore,
  ) { }

  ngOnInit() {
    this.shareStore.activeCycle$.subscribe(cycle => {
      if (!cycle) return;
      this.competencyCycleStore.getDepartmentIncomplete(cycle);
    });
    this.loading$.subscribe(res => {
      this.loading = res
    })
    this.cycleStatus$.subscribe(result => {
      const { departmentInCompleteComp, competencyEvalProgress } = result;

      //Multi-bar chart data
      this.barChartLabel = departmentInCompleteComp.labels;
      this.selfEvalData = departmentInCompleteComp.datasets
        .filter(dataset => dataset.label === "Self Evaluation")
        .flatMap(dataset => dataset.data);
      this.managerEvalData = departmentInCompleteComp.datasets
        .filter(dataset => dataset.label === "Supervisor")
        .flatMap(dataset => dataset.data);

      //Pie chart data
      this.pieLabels = competencyEvalProgress.labels;
      this.pieChartData = competencyEvalProgress.datasets;
      this.completionPercentage = competencyEvalProgress.datasets[0];

      // this.barChartLabel = _.map(departmentInComplete,'department.departmentName');
      // this.selfEvalData = _.map(departmentInComplete, 'employeePercentage');
      // this.managerEvalData = _.map(departmentInComplete, 'evaluatorPercentage');
      // this.pieLabels = _.reverse([...companyInComplete]).map(c => c.label);
      // this.pieChartData = _.reverse([...companyInComplete]).map(c => c.data);
      // this.completionPercentage = _.find(companyInComplete, { label: 'Completed' })?.data ?? 0;

      this.initBarChartData();
      this.initPieChartData();
    });
  }

  private initBarChartData(): void {
    this.barChartData = {
      labels: this.barChartLabel,
      datasets: [
        {
          label: 'Self',
          backgroundColor: colorObj['primary'],
          borderColor: colorObj['primary'],
          data: this.selfEvalData,
        },
        {
          type: 'bar',
          label: 'Manager',
          backgroundColor: colorObj['lightGreen'],
          data: this.managerEvalData,
        },
      ],
    };
  }

  private initPieChartData(): void {
    this.pieData = {
      labels: this.pieLabels,
      datasets: [
        {
          data: this.pieChartData,
          backgroundColor: [colorObj.primaryLight2, colorObj.primaryLight],
          hoverBackgroundColor: [colorObj.primaryLight2, colorObj.primaryLight],
        },
      ],
    };
  }
}
