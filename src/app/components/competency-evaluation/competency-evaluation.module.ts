import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetencyEvaluationRoutingModule } from './competency-evaluation-routing.module';
import { CompetencyEvaluationComponent } from './competency-evaluation.component';
import { ShareModule } from '../share/share.module';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { EmployeeDashboardModule } from '../employee-dashboard/employee-dashboard.module';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    CompetencyEvaluationComponent,
  ],
  imports: [
    CommonModule,
    CompetencyEvaluationRoutingModule,
    ShareModule,
    AppTopbarModule,
    EmployeeDashboardModule,
    RouterModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService]
})
export class CompetencyEvaluationModule { }
