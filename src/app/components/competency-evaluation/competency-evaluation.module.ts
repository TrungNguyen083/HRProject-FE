import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetencyEvaluationRoutingModule } from './competency-evaluation-routing.module';
import { CompetencyEvaluationComponent } from './competency-evaluation.component';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';


@NgModule({
  declarations: [
    CompetencyEvaluationComponent,
  ],
  imports: [
    CommonModule,
    CompetencyEvaluationRoutingModule,
    ShareModule,
    RouterModule,
    ConfirmDialogModule,
    AppTopbarModule
  ],
  providers: [ConfirmationService]
})
export class CompetencyEvaluationModule { }
