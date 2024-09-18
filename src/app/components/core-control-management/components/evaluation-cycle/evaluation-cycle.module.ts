import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EvaluationCycleRoutingModule } from './evaluation-cycle-routing.module';
import { EvaluationCycleComponent } from './evaluation-cycle.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EvaluationItemCardComponent } from './components/evaluation-item-card/evaluation-item-card.component';
import { ShareModule } from "../../../share/share.module";
import { EvaluateCycleOverallService } from './services/evaluation-cycle.service';
import { CycleOverallStore } from './stores/evaluation-cycle.store';
import { RouterModule } from '@angular/router';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { EvaluationCycleInfoFormComponent } from './components/evaluation-cycle-info-form/evaluation-cycle-info-form.component';
import { EvaluationCycleInfoForm2Component } from './components/evaluation-cycle-info-form2/evaluation-cycle-info-form2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [

    EvaluationCycleComponent,
    EvaluationItemCardComponent,
    EvaluationListComponent,
    EvaluationCycleInfoFormComponent,
    EvaluationCycleInfoForm2Component,
  ],
  imports: [
    CommonModule,
    EvaluationCycleRoutingModule,
    ButtonModule,
    DropdownModule,
    ShareModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  providers: [DatePipe, CycleOverallStore, EvaluateCycleOverallService, ConfirmationService]
})
export class EvaluationCycleModule { }
