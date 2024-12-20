import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TimelineModule } from 'primeng/timeline';

import { EmployeeSummaryDashboardRoutingModule } from './employee-summary-dashboard-routing.module';
import { EmployeeSummaryDashboardComponent } from './employee-summary-dashboard.component';
import { ShareModule } from 'src/app/components/share/share.module';
import { EmployeeAtGlanceComponent } from './components/employee-at-glance/employee-at-glance.component';
import { EmployeeCompetencyOverallRadarChartComponent } from './components/employee-competency-overall-radar-chart/employee-competency-overall-radar-chart.component';
import { EmployeePerformanceScoreChartComponent } from './components/employee-performance-score-chart/employee-performance-score-chart.component';
import { EmployeeScoreTableComponent } from './components/employee-score-table/employee-score-table.component';
import { EmployeeSkillStatisticComponent } from './components/employee-skill-statistic/employee-skill-statistic.component';
import { EmployeeCareerPathComponent } from './components/employee-career-path/employee-career-path.component';


@NgModule({
  declarations: [EmployeeSummaryDashboardComponent, EmployeeAtGlanceComponent, EmployeeCompetencyOverallRadarChartComponent, EmployeePerformanceScoreChartComponent, EmployeeScoreTableComponent, EmployeeSkillStatisticComponent, EmployeeCareerPathComponent],
  imports: [
    CommonModule,
    EmployeeSummaryDashboardRoutingModule,
    ShareModule,
    ButtonModule,
    DialogModule,
    TimelineModule
  ]
})
export class EmployeeSummaryDashboardModule { }
