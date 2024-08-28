import { Component, OnInit } from '@angular/core';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  donutChartOptions,
  verticalStackedBarOptions,
} from 'src/app/components/share/constants/chart.constant';
import { ChartOptions, ChartData } from 'chart.js';
import { DonutChartOptions } from 'src/app/components/share/models/chart.model';
import { IEmployeeAtGlanceParams } from '../../models/employee-summary-dashboard';
import { EmployeeDashboardStore } from 'src/app/components/employee-dashboard/store/employee-dashboard-store.service';
import { EplSummaryDashboardStore } from '../../store/epl-summary-dashboard-store.service';
@Component({
  selector: 'employee-at-glance',
  templateUrl: './employee-at-glance.component.html',
  styleUrls: ['./employee-at-glance.component.scss'],
})
export class EmployeeAtGlanceComponent implements OnInit {
  skillGapLable!: string;
  competencyLable!: string;
  completedLable!: string;
  barOptions: ChartOptions = verticalStackedBarOptions;
  barData!: ChartData;
  pieData!: ChartData;
  pieOptions: DonutChartOptions = {
    ...donutChartOptions,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  plugins = [ChartDataLabels];
  params: IEmployeeAtGlanceParams = {
    employeeId: 0,
    cycleId: 0,
  }

  constructor(private summaryStore: EplSummaryDashboardStore,
    private eDashboardStore: EmployeeDashboardStore) { }

  ngOnInit(): void {
    this.eDashboardStore.employeeId$.subscribe(employeeId => {
      if (!employeeId) return;
      this.params = { ...this.params, employeeId }

      this.eDashboardStore.previousCycle$.subscribe(cycleId => {
        if (!cycleId) return;
        this.params = { ...this.params, cycleId };
        this.initSkillGapBarChart();
      });

      this.eDashboardStore.currentCycle$.subscribe(cycleId => {
        if (!cycleId) return;
        this.params = { ...this.params, cycleId };
        this.initCompetencyPieChart();
      })
    });
  }

  private initCompetencyPieChart() {
    this.summaryStore.getEmployeeCompetencyPieChart(this.params);
    this.summaryStore.employeeCompetencyPieChart$.subscribe(res => {
      if (!res) return;
      const pieLabels = res.labels;
      const pieChartData = res.datasets;
      this.completedLable = pieChartData[0].toFixed(2).toString() + '%';

      this.pieData = {
        labels: pieLabels,
        datasets: [
          {
            data: pieChartData,
            backgroundColor: [colorObj.primaryLight4, colorObj.primaryLight],
            hoverBackgroundColor: [colorObj.primaryLight4, colorObj.primaryLight],
          },
        ],
      };
    });
  }

  private initSkillGapBarChart() {
    this.summaryStore.getEmployeeSkillGapBarChart(this.params);
    this.summaryStore.employeeSkillGapBarChart$.subscribe(res => {
      if (!res) return;

      this.skillGapLable = res.title;

      const labels = res.items.map(item => item.label);
      const values = res.items.map(item => item.value);

      this.barData = {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Current',
            backgroundColor: colorObj.primaryLight4,
            data: [values[0], values[1]],
          },
          {
            type: 'bar',
            label: 'Target',
            backgroundColor: colorObj.primaryLight,
            data: [values[1] - values[0], 0],
          },
        ],
      };
    });
  }
}
