import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SumCompetencyEvaluationRoutingModule } from './sum-competency-evaluation-routing.module';
import { SumCompetencyEvaluationComponent } from './sum-competency-evaluation.component';
import { EvaluationListComponent } from './components/competency-progress/components/evaluation-list/evaluation-list.component';
import { EvaluationItemComponent } from './components/competency-progress/components/evaluation-item/evaluation-item.component';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { SumDashboardModule } from '../sum-dashboard/sum-dashboard.module';
import { EvaluationTimelineComponent } from './components/competency-progress/components/evaluation-timeline/evaluation-timeline.component';
import { ShareModule } from '../share/share.module';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { SelfEvaluationFormComponent } from './components/competency-evaluation-form/components/self-evaluation-form/self-evaluation-form.component';
import { EmployeeEvaluationFormComponent } from './components/competency-evaluation-form/components/employee-evaluation-form/employee-evaluation-form.component';
import { FinalEvaluationFormComponent } from './components/competency-evaluation-form/components/final-evaluation-form/final-evaluation-form.component';
import { CompetencyEvaluationFormComponent } from './components/competency-evaluation-form/competency-evaluation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';
import { CompetencyProgressComponent } from './components/competency-progress/competency-progress.component';


@NgModule({
  declarations: [
    SumCompetencyEvaluationComponent,
    CompetencyProgressComponent,
    SelfEvaluationFormComponent,
    EmployeeEvaluationFormComponent,
    FinalEvaluationFormComponent,
    EvaluationTimelineComponent,
    EvaluationListComponent,
    EvaluationItemComponent,
    CompetencyEvaluationFormComponent,
  ],
  imports: [
    CommonModule,
    SumCompetencyEvaluationRoutingModule,
    AppTopbarModule,
    SumDashboardModule,
    ShareModule,
    ButtonModule,
    TimelineModule,
    AccordionModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class SumCompetencyEvaluationModule { }
