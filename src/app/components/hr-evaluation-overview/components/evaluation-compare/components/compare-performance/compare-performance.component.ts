import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { barChartOption } from 'src/app/components/share/constants/chart.constant';
import { barChartCompareColor } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { EvaluationCompareStore } from '../../stores/evaluation-compare.store';

const mockData = {
  labels: ['Evaluation Cycle 3', 'Evaluation Cycle 4'],
  datasets: [
    {
      label: 'Vo Trung Nguyen',
      data: [3.5, 4]
    },
    {
      label: 'Vo Truong Tai',
      data: [4, 2]
    }
  ]
}


@Component({
  selector: 'compare-performance',
  templateUrl: './compare-performance.component.html',
  styleUrls: ['./compare-performance.component.scss']
})
export class ComparePerformanceComponent implements OnInit {
  options: ChartOptions = barChartOption;
  data!: ChartData;

  constructor(
    private evaluationCompareStore: EvaluationCompareStore,
  ) { }

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.evaluationCompareStore.employeeIds$.subscribe(employeeIds => {
      if (!employeeIds) return;
      this.evaluationCompareStore.getComparePerformanceChart(employeeIds);
    })

    this.evaluationCompareStore.comparePerformanceChart$.subscribe(res => {
      if(!res) return;
      
      const datasets = res.datasets.map((data, i) => {
        const colorObj = barChartCompareColor[i];
  
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
