import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SumPerformanceEvaluationRoutingModule } from './sum-performance-evaluation-routing.module';
import { SumPerformanceEvaluationComponent } from './sum-performance-evaluation.component';
import { PerformanceProgressComponent } from './components/performance-progress/performance-progress.component';
import { SelfEvaluationFormComponent } from './components/performance-evaluation-form/components/self-evaluation-form/self-evaluation-form.component';
import { EmployeeEvaluationFormComponent } from './components/performance-evaluation-form/components/employee-evaluation-form/employee-evaluation-form.component';
import { FinalEvaluationFormComponent } from './components/performance-evaluation-form/components/final-evaluation-form/final-evaluation-form.component';
import { EvaluationItemComponent } from './components/performance-progress/components/evaluation-item/evaluation-item.component';
import { EvaluationListComponent } from './components/performance-progress/components/evaluation-list/evaluation-list.component';
import { EvaluationTimelineComponent } from './components/performance-progress/components/evaluation-timeline/evaluation-timeline.component';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { ShareModule } from '../share/share.module';
import { PerformanceEvaluationFormComponent } from './components/performance-evaluation-form/performance-evaluation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';


@NgModule({
  declarations: [
    SumPerformanceEvaluationComponent,
    PerformanceProgressComponent,
    SelfEvaluationFormComponent,
    EmployeeEvaluationFormComponent,
    FinalEvaluationFormComponent,
    EvaluationItemComponent,
    EvaluationListComponent,
    EvaluationTimelineComponent,
    PerformanceEvaluationFormComponent
  ],
  imports: [
    CommonModule,
    SumPerformanceEvaluationRoutingModule,
    ShareModule,
    ButtonModule,
    TimelineModule,
    AppTopbarModule,
    AccordionModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class SumPerformanceEvaluationModule { }
