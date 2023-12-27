import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationCycleManagementRoutingModule } from './evaluation-cycle-management-routing.module';
import { EvaluationCycleManagementComponent } from './evaluation-cycle-management.component';
import { ShareModule } from '../share/share.module';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';


@NgModule({
  declarations: [
    EvaluationCycleManagementComponent
  ],
  imports: [
    CommonModule,
    EvaluationCycleManagementRoutingModule,
    ShareModule,
    AppTopbarModule
  ]
})
export class EvaluationCycleManagementModule { }
