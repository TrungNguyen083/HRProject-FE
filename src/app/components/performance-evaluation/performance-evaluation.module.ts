import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceEvaluationRoutingModule } from './performance-evaluation-routing.module';
import { PerformanceEvaluationComponent } from './performance-evaluation.component';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { EmployeeDashboardModule } from '../employee-dashboard/employee-dashboard.module';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    PerformanceEvaluationComponent
  ],
  imports: [
    CommonModule,
    PerformanceEvaluationRoutingModule,
    ShareModule,
    AppTopbarModule,
    EmployeeDashboardModule,
    RouterModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService]
})
export class PerformanceEvaluationModule { }
