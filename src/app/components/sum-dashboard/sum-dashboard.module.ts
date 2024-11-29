import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumDashboardComponent } from './sum-dashboard.component';
import { SumDashboardRoutingModule } from './sum-dashboard-routing.module';
import { SumOverviewComponent } from './components/sum-overview/sum-overview.component';
import { SumOverviewCompetencyComponent } from './components/sum-overview/components/sum-overview-competency/sum-overview-competency.component';
import { SumOverviewPerformanceComponent } from './components/sum-overview/components/sum-overview-performance/sum-overview-performance.component';
import { SumOverviewHeadcountsComponent } from './components/sum-overview/components/sum-overview-headcounts/sum-overview-headcounts.component';
import { SumOverviewStartsComponent } from './components/sum-overview/components/sum-overview-starts/sum-overview-starts.component';
import { ShareModule } from '../share/share.module';
import { ReviewProgressComponent } from './components/review-progress/review-progress.component';
import { CompetencyReviewProgressComponent } from './components/review-progress/components/competency-review-progress/competency-review-progress.component';
import { PerformanceReviewProgressComponent } from './components/review-progress/components/performance-review-progress/performance-review-progress.component';
import { SkeletonModule } from 'primeng/skeleton';
import { GridBoxPerformanceComponent } from './components/grid-box-performance/grid-box-performance.component';
import { TopSkillsComponent } from './components/top-skills/top-skills.component';
import { TopCompetenciesComponent } from './components/top-competencies/top-competencies.component';
import { TopPerformersComponent } from './components/top-performers/top-performers.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ReviewStatusComponent } from './components/review-status/review-status.component';
import { CompetencyReviewStatusComponent } from './components/review-status/components/competency-review-status/competency-review-status.component';
import { PerformanceReviewStatusComponent } from './components/review-status/components/performance-review-status/performance-review-status.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { GoalProgressComponent } from './components/goal-progress/goal-progress.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadarChartCompetencyGapComponent } from './components/radar-chart-competency-gap/radar-chart-competency-gap.component';
import { HeatMapSkillLevelComponent } from './components/heat-map-skill-level/heat-map-skill-level.component';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';


@NgModule({
  declarations: [
    SumDashboardComponent,
    SumOverviewComponent,
    SumOverviewCompetencyComponent,
    SumOverviewPerformanceComponent,
    SumOverviewHeadcountsComponent,
    SumOverviewStartsComponent,
    ReviewProgressComponent,
    CompetencyReviewProgressComponent,
    PerformanceReviewProgressComponent,
    HeatMapSkillLevelComponent,
    GridBoxPerformanceComponent,
    TopSkillsComponent,
    TopCompetenciesComponent,
    TopPerformersComponent,
    ReviewStatusComponent,
    CompetencyReviewStatusComponent,
    PerformanceReviewStatusComponent,
    RadarChartCompetencyGapComponent,
    GoalProgressComponent,
  ],
  imports: [
    CommonModule,
    DataViewModule,
    SumDashboardRoutingModule,
    ShareModule,
    SkeletonModule,
    AppTopbarModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    AvatarModule,
    ButtonModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MultiSelectModule,
    ProgressBarModule,
  ],
})
export class SumDashboardModule { }
