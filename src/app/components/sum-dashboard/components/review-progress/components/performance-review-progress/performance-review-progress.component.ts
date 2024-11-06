import { Component, OnInit } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartData, ChartOptions } from 'chart.js';
import { multipleHorizontalBarOptions, donutChartOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { DonutChartOptions } from 'src/app/components/share/models/chart.model';
import { ICycleDepartmentParams } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { combineLatest } from 'rxjs';
import { SumDashboardStore } from 'src/app/components/sum-dashboard/stores/sum-dashboard.store';

@Component({
  selector: 'performance-review-progress',
  templateUrl: './performance-review-progress.component.html',
  styleUrls: ['./performance-review-progress.component.scss']
})
export class PerformanceReviewProgressComponent implements OnInit {
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
        this.sumDashboardStore.getPerformanceReviewProgress(this.params);
      })
    })

    this.sumDashboardStore.performanceReviewProgress$.subscribe(res => {
      const { completedPerformEvaluationByPosition, performanceEvaluationProgressPieChart } = res;

      //Multi-bar chart data
      this.barChartLabel = completedPerformEvaluationByPosition.labels;
      this.selfEvalData = completedPerformEvaluationByPosition.datasets
        .filter(dataset => dataset.label === "Self Evaluation")
        .flatMap(dataset => dataset.data);
      this.managerEvalData = completedPerformEvaluationByPosition.datasets
        .filter(dataset => dataset.label === "Supervisor")
        .flatMap(dataset => dataset.data);

      //Pie chart data
      this.pieLabels = performanceEvaluationProgressPieChart.labels;
      this.pieChartData = performanceEvaluationProgressPieChart.datasets;
      this.completionPercentage = performanceEvaluationProgressPieChart.datasets[0];
      
      this.initBarChartData();
      this.initPieChartData();
    })

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
