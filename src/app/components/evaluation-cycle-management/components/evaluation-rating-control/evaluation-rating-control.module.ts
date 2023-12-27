import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/components/share/share.module';
import { PerformanceRankingRatingComponent } from './components/performance-ranking-rating/performance-ranking-rating.component';
import { ProficiencyLevelRatingComponent } from './components/proficiency-level-rating/proficiency-level-rating.component';
import { EvaluationRatingControlRoutingModule } from './evaluation-rating-control-routing.module';
import { EvaluationRatingControlComponent } from './evaluation-rating-control.component';
import { EvaluationRatingControlItemComponent } from './components/evaluation-rating-control-item/evaluation-rating-control-item.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    EvaluationRatingControlComponent,
    ProficiencyLevelRatingComponent,
    PerformanceRankingRatingComponent,
    EvaluationRatingControlItemComponent
  ],
  imports: [
    CommonModule,
    EvaluationRatingControlRoutingModule,
    ShareModule,
    ButtonModule
  ]
})
export class EvaluationRatingControlModule { }
