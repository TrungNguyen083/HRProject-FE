import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { EmployeeAssessmentRoutingModule } from './employee-assessment-routing.module';
import { EmployeeAssessmentComponent } from './employee-assessment.component';
import { EmployeeEvaluationHeaderComponent } from './components/employee-evaluation-header/employee-evaluation-header.component';
import { EmployeeEvaluationTableComponent } from './components/employee-evaluation-table/employee-evaluation-table.component';
import { ShareModule } from 'src/app/components/share/share.module';
import { EvaluationStatusTagComponent } from './components/evaluation-status-tag/evaluation-status-tag.component';


@NgModule({
  declarations: [EmployeeAssessmentComponent, EmployeeEvaluationHeaderComponent, EmployeeEvaluationTableComponent, EvaluationStatusTagComponent],
  imports: [
    CommonModule,
    EmployeeAssessmentRoutingModule,
    ShareModule,
    ButtonModule
  ]
})
export class EmployeeAssessmentModule { }
