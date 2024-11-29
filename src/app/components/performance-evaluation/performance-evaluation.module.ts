import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceEvaluationRoutingModule } from './performance-evaluation-routing.module';
import { PerformanceEvaluationComponent } from './performance-evaluation.component';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ShareModule } from '../share/share.module';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';


@NgModule({
  declarations: [
    PerformanceEvaluationComponent
  ],
  imports: [
    CommonModule,
    PerformanceEvaluationRoutingModule,
    ShareModule,
    AppTopbarModule,
    RouterModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService]
})
export class PerformanceEvaluationModule { }
