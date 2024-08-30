import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { donutChartOptions, pieChartOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { DonutChartOptions } from 'src/app/components/share/models/chart.model';
import { ICycleOverall } from '../../models/evaluation-cycle.model';


const mockApiDonutResponse = {
  donutLabels: ['Completed', 'InCompleted'],
  donutChartData: [30, 70],
};

const mockApiPieResponse = {
  pieLabels: [
    'Problem solving',
    'Willingness to learn',
    'Communication',
    'Team spirit',
    'Customer orientation',
    'English',
    'Job knowledge',
    'Work quality'
  ],
  pieChartData: [15, 20, 10, 25, 10, 5, 10, 5]
};

const mockApiPiePerResponse = {
  pieLabels: [
    'Not evaluate yet',
    'Unsatisfactory',
    'Partially meet expectation',
    'Meet expectation',
    'Partially exceed expectation',
    'Oustanding',
  ],
  pieChartData: [10, 15, 20, 30, 15, 10]
};


@Component({
  selector: 'evaluation-item-card',
  templateUrl: './evaluation-item-card.component.html',
  styleUrls: ['./evaluation-item-card.component.scss']
})
export class EvaluationItemCardComponent implements OnInit {
  
  @Input() cycleOverall!: ICycleOverall;
  completionPercentage!: number;
  donutData!: ChartData;
  donutOptions: DonutChartOptions = donutChartOptions;
  donutLabels: string[] = [];
  donutChartData: number[] = [];
  pieData!: ChartData;
  pieOptions: ChartOptions = pieChartOptions;
  pieLabels: string[] = [];
  pieChartData: number[] = [];
  piePerData!: ChartData;
  piePerOptions: ChartOptions = pieChartOptions;
  piePerLabels: string[] = [];
  piePerChartData: number[] = [];

  constructor(
    
  ) { }

  ngOnInit(): void {
    this.donutLabels = mockApiDonutResponse.donutLabels;
    this.donutChartData = mockApiDonutResponse.donutChartData;
    this.pieLabels = mockApiPieResponse.pieLabels;
    this.pieChartData = mockApiPieResponse.pieChartData;
    this.piePerLabels = mockApiPiePerResponse.pieLabels;
    this.piePerChartData = mockApiPiePerResponse.pieChartData;
    this.initDonutChartData();
    this.initPieChartData();
    this.initPiePerChartData();
  }

  private initDonutChartData(): void {
    this.completionPercentage = this.cycleOverall.completedEvaluate.datasets[0];
    this.donutData = {
      labels: this.cycleOverall.completedEvaluate.labels,
      datasets: [
        {
          data: this.cycleOverall.completedEvaluate.datasets,
          backgroundColor: [colorObj.primaryLight2, colorObj.primaryLight],
          hoverBackgroundColor: [colorObj.primaryLight2, colorObj.primaryLight],
        },
      ],
    };
  }

  private initPieChartData(): void {
    this.pieData = {
      labels: this.cycleOverall.competencyOverall.labels,
      datasets: [
        {
          data: this.cycleOverall.competencyOverall.datasets,
          backgroundColor: [colorObj.whiteGreen, colorObj.primaryLight, colorObj.primaryLight1, colorObj.primary, colorObj.primaryLight4, colorObj.primaryLight2, colorObj.primaryLight3, colorObj.primaryLight5],
          hoverBackgroundColor: [colorObj.whiteGreen, colorObj.primaryLight, colorObj.primaryLight1, colorObj.primary, colorObj.primaryLight4, colorObj.primaryLight2, colorObj.primaryLight3, colorObj.primaryLight5],
        },
      ],
    };
  }

  private initPiePerChartData(): void {
    this.piePerData = {
      labels: this.cycleOverall.performanceOverall.labels,
      datasets: [
        {
          data: this.cycleOverall.performanceOverall.datasets,
          backgroundColor: [colorObj.primaryLight, colorObj.primaryLight1, colorObj.primary, colorObj.primaryLight4, colorObj.primaryLight2, colorObj.primaryLight3, colorObj.primaryLight5],
          hoverBackgroundColor: [colorObj.whiteGreen, colorObj.primaryLight, colorObj.primaryLight1, colorObj.primary, colorObj.primaryLight4, colorObj.primaryLight2, colorObj.primaryLight3, colorObj.primaryLight5],
        },
      ],
    };
  }
}
