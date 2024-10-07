import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { multipleHorizontalBarOptions, donutChartOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { DonutChartOptions } from 'src/app/components/share/models/chart.model';
import { ICycleDepartmentParams } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { SumDashboardStore } from 'src/app/components/sum-dashboard/stores/sum-dashboard.store';

@Component({
  selector: 'competency-review-progress',
  templateUrl: './competency-review-progress.component.html',
  styleUrls: ['./competency-review-progress.component.scss']
})
export class CompetencyReviewProgressComponent implements OnInit {
  date!: Date;
  barChartData!: ChartData;
  barChartOptions: ChartOptions = multipleHorizontalBarOptions;
  pieData!: ChartData;
  pieOptions: DonutChartOptions = donutChartOptions;
  plugins = [ChartDataLabels];
  barChartLabel: string[] = [];
  selfEvalData: number[] = [];
  managerEvalData: number[] = [];
  pieLabels: string[] = [];
  pieChartData: number[] = [];
  completionPercentage = 0;
  params!: ICycleDepartmentParams;
  loading = false;

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.sumDashboardStore.departmentId$.subscribe(departmentId => {
        if (!departmentId) return;
        this.params = { cycleId, departmentId }
        this.sumDashboardStore.getCompetencyReviewProgress(this.params);
      })
    })

    this.sumDashboardStore.competencyReviewProgress$.subscribe(res => {
      const { completedEvaluationByPosition, competencyEvaluationProgressPieChart } = res;

      if (!completedEvaluationByPosition && !competencyEvaluationProgressPieChart) return;

      //Multi-bar chart data
      this.barChartLabel = completedEvaluationByPosition.labels;
      this.selfEvalData = completedEvaluationByPosition.datasets
        .filter(dataset => dataset.label === "Self Evaluation")
        .flatMap(dataset => dataset.data);
      this.managerEvalData = completedEvaluationByPosition.datasets
        .filter(dataset => dataset.label === "Supervisor")
        .flatMap(dataset => dataset.data);

      //Pie chart data
      this.pieLabels = competencyEvaluationProgressPieChart.labels;
      this.pieChartData = competencyEvaluationProgressPieChart.datasets;
      this.completionPercentage = competencyEvaluationProgressPieChart.datasets[0];
    })

    this.initBarChartData();
    this.initPieChartData();
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
