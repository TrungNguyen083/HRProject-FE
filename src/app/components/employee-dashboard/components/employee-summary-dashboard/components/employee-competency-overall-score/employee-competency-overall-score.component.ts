import { Component, OnInit } from '@angular/core';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import {ChartOptions, ChartData} from "chart.js"
import { radarChartOptions } from 'src/app/components/share/constants/chart.constant';
@Component({
  selector: 'employee-competency-overall-score',
  templateUrl: './employee-competency-overall-score.component.html',
  styleUrls: ['./employee-competency-overall-score.component.scss'],
})
export class EmployeeCompetencyOverallScoreComponent implements OnInit {
  options: ChartOptions = radarChartOptions;
  data!: ChartData;

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: [
        'Problem solving',
        'Willingness to learn',
        'Communication',
        'Team spirit',
        'Customer orientation',
        'English',
        'Job knowledge',
        'Work quality',
      ],
      datasets: [
        {
          label: 'Self-evaluation',
          borderColor: colorObj.primary,
          pointBackgroundColor: colorObj.primary,
          pointBorderColor: colorObj.primary,
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: colorObj.primary,
          data: [3, 4, 1, 3, 2, 1, 3, 4],
        },
        {
          label: 'Supervisor',
          borderColor: colorObj.primaryLight2,
          pointBackgroundColor: colorObj.primaryLight2,
          pointBorderColor: colorObj.primaryLight2,
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: colorObj.primaryLight2,
          data: [2, 4, 1, 3, 1, 2, 3, 2],
        },
        {
          label: 'Final score',
          borderColor: colorObj.primaryLight3,
          pointBackgroundColor: colorObj.primaryLight3,
          pointBorderColor: colorObj.primaryLight3,
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: colorObj.primaryLight3,
          data: [3, 2, 2, 1, 2, 4, 2, 4],
        },
      ],
    };
  }
}
