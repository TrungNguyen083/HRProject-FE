import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TimelineModule } from 'primeng/timeline';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';

import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { HrDashboardRoutingModule } from './hr-dashboard-routing.module';
import { HrDashboardComponent } from './hr-dashboard.component';
import { HrOverviewComponent } from './components/hr-overview/hr-overview.component';
import { CompetencyLevelComponent } from './components/competency-level-by-level-and-position/competency-level.component';
import { CompetencyLevelByUnitComponent } from './components/competency-level-by-unit/competency-level-by-unit.component';
import { TopSkillsComponent } from './components/top-skills/top-skills.component';
import { ShareModule } from '../share/share.module';
import { CompetencyReviewCycleComponent } from './components/competency-review-cycle/competency-review-cycle.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { TopPerformersComponent } from './components/top-performers/top-performers.component';
import { TopCompetenciesComponent } from './components/top-competencies/top-competencies.component';
import { EmployeePerformanceGridBoxComponent } from './components/employee-performance-grid-box/employee-performance-grid-box.component';
import { PerformanceByJobLevelComponent } from './components/performance-by-job-level/performance-by-job-level.component';
import { PositionFilterComponent } from './components/position-filter/position-filter.component';
import { DashboardDepartmentFilterComponent } from './components/dashboard-department-filter/dashboard-department-filter.component';
import { HrOverviewCurrentHeadcountsComponent } from './components/hr-overview/components/hr-overview-current-headcounts/hr-overview-current-headcounts.component';
import { HrOverviewStarEmployeesComponent } from './components/hr-overview/components/hr-overview-star-employees/hr-overview-star-employees.component';
import { HrOverviewPerformanceComponent } from './components/hr-overview/components/hr-overview-performance/hr-overview-performance.component';
import { HrOverviewCompetencyComponent } from './components/hr-overview/components/hr-overview-competency/hr-overview-competency.component';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [
    HrDashboardComponent,
    HrOverviewComponent,
    CompetencyReviewCycleComponent,
    TimeLineComponent,
    CompetencyLevelComponent,
    CompetencyLevelByUnitComponent,
    TopSkillsComponent,
    TopPerformersComponent,
    TopCompetenciesComponent,
    EmployeePerformanceGridBoxComponent,
    PerformanceByJobLevelComponent,
    PositionFilterComponent,
    DashboardDepartmentFilterComponent,
    HrOverviewCurrentHeadcountsComponent,
    HrOverviewStarEmployeesComponent,
    HrOverviewPerformanceComponent,
    HrOverviewCompetencyComponent,
  ],
  imports: [
    CommonModule,
    HrDashboardRoutingModule,
    AppTopbarModule,
    CalendarModule,
    FormsModule,
    TimelineModule,
    DropdownModule,
    ShareModule,
    AvatarModule,
    OverlayPanelModule,
    RadioButtonModule,
    ReactiveFormsModule,
    DialogModule,
    MultiSelectModule,
    SkeletonModule
  ]
})
export class HrDashboardModule { }
