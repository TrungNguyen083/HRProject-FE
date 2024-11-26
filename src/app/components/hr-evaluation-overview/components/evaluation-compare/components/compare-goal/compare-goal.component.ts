import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { multiSeriesPieChartOptions } from 'src/app/components/share/constants/chart.constant';
import { multiPieChartColor } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { ICompareGoal, ICompareParams } from '../../models/evaluation-compare.model';
import { EvaluationCompareStore } from '../../stores/evaluation-compare.store';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'compare-goal',
  templateUrl: './compare-goal.component.html',
  styleUrls: ['./compare-goal.component.scss']
})
export class CompareGoalComponent implements OnInit {
  compareGoals!: ICompareGoal[];
  data!: ChartData;
  options: ChartOptions = multiSeriesPieChartOptions;
  params!: ICompareParams;

  constructor(
    private evaluationCompareStore: EvaluationCompareStore,
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    combineLatest([
      this.evaluationCompareStore.employeeIds$,
      this.hrEvaluationOverviewStore.currentCycle$,
    ]).subscribe(([employeeIds, cycleId]) => {
      if (!employeeIds || !cycleId) return;

      this.params = { ...this.params, employeeIds, cycleId };
      this.evaluationCompareStore.getCompareGoal(this.params);
      this.evaluationCompareStore.getComparePieChart(this.params);
    })

    this.evaluationCompareStore.compareGoals$.subscribe(res => {
      if (!res) return;
      this.compareGoals = res;
    })

    this.loadChart();
  }

  loadChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.evaluationCompareStore.compareGoalPieChart$.subscribe(res => {
      if (!res) return;
      const datasets = res.datasets.map((data, i) => {
        const colorObj = multiPieChartColor[i];

        return {
          label: data.label,
          backgroundColor: colorObj.backgroundColor,
          pointHoverBackgroundColor: textColor,
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
