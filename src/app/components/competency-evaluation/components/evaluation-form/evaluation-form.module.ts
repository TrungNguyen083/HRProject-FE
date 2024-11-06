import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationFormRoutingModule } from './evaluation-form-routing.module';
import { EvaluationFormComponent } from './evaluation-form.component';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    EvaluationFormComponent,
  ],
  imports: [
    CommonModule,
    EvaluationFormRoutingModule,
    AccordionModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class EvaluationFormModule { }
