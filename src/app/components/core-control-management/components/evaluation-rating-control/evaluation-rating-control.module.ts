import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/components/share/share.module';
import { PerformanceRankingRatingComponent } from './components/performance-ranking-rating/performance-ranking-rating.component';
import { ProficiencyLevelRatingComponent } from './components/proficiency-level-rating/proficiency-level-rating.component';
import { EvaluationRatingControlRoutingModule } from './evaluation-rating-control-routing.module';
import { EvaluationRatingControlComponent } from './evaluation-rating-control.component';
import { EvaluationRatingControlItemComponent } from './components/evaluation-rating-control-item/evaluation-rating-control-item.component';
import { ButtonModule } from 'primeng/button';
import { RatingControlService } from './services/evaluation-rating-control.service';
import { RatingControlStore } from './stores/evaluation-rating-control.store';
import { ProficiencyLevelFormComponent } from './components/proficiency-level-form/proficiency-level-form.component';
import { PerformanceRankingFormComponent } from './components/performance-ranking-form/performance-ranking-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    EvaluationRatingControlComponent,
    ProficiencyLevelRatingComponent,
    PerformanceRankingRatingComponent,
    EvaluationRatingControlItemComponent,
    ProficiencyLevelFormComponent,
    PerformanceRankingFormComponent
  ],
  imports: [
    CommonModule,
    EvaluationRatingControlRoutingModule,
    ShareModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    InputTextareaModule,
    SliderModule,
    ConfirmDialogModule
  ],
  providers: [RatingControlStore, RatingControlService, ConfirmationService]
})
export class EvaluationRatingControlModule { }
