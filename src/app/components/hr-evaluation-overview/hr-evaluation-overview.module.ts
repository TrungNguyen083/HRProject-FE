import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrEvaluationOverviewRoutingModule } from './hr-evaluation-overview-routing.module';
import { HrEvaluationOverviewComponent } from './hr-evaluation-overview.component';
import { EvaluationResultComponent } from './components/evaluation-result/evaluation-result.component';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from './components/evaluation-result/components/evaluation-list/evaluation-list.component';
import { EvaluationItemComponent } from './components/evaluation-result/components/evaluation-item/evaluation-item.component';
import { CompetencyFormComponent } from './components/evaluation-form/components/competency-form/competency-form.component';
import { PerformanceFormComponent } from './components/evaluation-form/components/performance-form/performance-form.component';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { EvaluationTimelineComponent } from './components/evaluation-result/components/evaluation-timeline/evaluation-timeline.component';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { TimelineModule } from 'primeng/timeline';
import { ShareModule } from '../share/share.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { EvaluationPromotionComponent } from './components/evaluation-promotion/evaluation-promotion.component';
import { PromotionItemComponent } from './components/evaluation-promotion/components/promotion-item/promotion-item.component';
import { PromotionListComponent } from './components/evaluation-promotion/components/promotion-list/promotion-list.component';
import { EvaluationCompareComponent } from './components/evaluation-compare/evaluation-compare.component';
import { CompareGoalComponent } from './components/evaluation-compare/components/compare-goal/compare-goal.component';
import { ComparePerformanceComponent } from './components/evaluation-compare/components/compare-performance/compare-performance.component';
import { CompareOverallComponent } from './components/evaluation-compare/components/compare-overall/compare-overall.component';
import { CompareCompetencyRadarchartComponent } from './components/evaluation-compare/components/compare-competency-radarchart/compare-competency-radarchart.component';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PromotionFormComponent } from './components/evaluation-promotion/components/promotion-form/promotion-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    HrEvaluationOverviewComponent,
    EvaluationResultComponent,
    EvaluationFormComponent,
    EvaluationListComponent,
    EvaluationItemComponent,
    CompetencyFormComponent,
    PerformanceFormComponent,
    EvaluationTimelineComponent,
    EvaluationPromotionComponent,
    PromotionItemComponent,
    PromotionListComponent,
    EvaluationCompareComponent,
    CompareOverallComponent,
    CompareCompetencyRadarchartComponent,
    CompareGoalComponent,
    ComparePerformanceComponent,
    PromotionFormComponent
  ],
  imports: [
    CommonModule,
    HrEvaluationOverviewRoutingModule,
    ShareModule,
    ButtonModule,
    TimelineModule,
    AppTopbarModule,
    AccordionModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    DataViewModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextareaModule
  ],
  providers: [ConfirmationService]
})
export class HrEvaluationOverviewModule { }
