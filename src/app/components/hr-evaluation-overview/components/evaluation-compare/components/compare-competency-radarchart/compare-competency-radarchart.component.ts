import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { radarChartOptions } from 'src/app/components/share/constants/chart.constant';
import { radarChartColors } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { IChartData, ICompareParams } from '../../models/evaluation-compare.model';
import { EvaluationCompareStore } from '../../stores/evaluation-compare.store';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'compare-competency-radarchart',
  templateUrl: './compare-competency-radarchart.component.html',
  styleUrls: ['./compare-competency-radarchart.component.scss']
})
export class CompareCompetencyRadarchartComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = radarChartOptions;
  params!: ICompareParams;

  constructor(
    private notificationService: NotificationService,
    private evaluationCompareStore: EvaluationCompareStore,
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore
  ) { }

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    combineLatest([
      this.evaluationCompareStore.employeeIds$,
      this.hrEvaluationOverviewStore.currentCycle$,
    ]).subscribe(([employeeIds, cycleId]) => {
      if (!employeeIds || !cycleId) return;

      this.params = { ...this.params, employeeIds, cycleId };
      this.evaluationCompareStore.getCompareRadarChart(this.params);
    })

    this.evaluationCompareStore.compareCompetencyRadarChart$.subscribe(res => {
      if (!res) return;

      const datasets = res.datasets.map((data, i) => {
        const colorObj = radarChartColors[i];
  
        return {
          label: data.label,
          borderColor: colorObj.borderColor,
          backgroundColor: colorObj.backgroundColor,
          pointBackgroundColor: colorObj.borderColor,
          pointBorderColor: colorObj.borderColor,
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: colorObj.borderColor,
          data: data.dataset,
        };
      });
  
      this.data = {
        labels: res.labels,
        datasets,
      };
    })
  }
}
