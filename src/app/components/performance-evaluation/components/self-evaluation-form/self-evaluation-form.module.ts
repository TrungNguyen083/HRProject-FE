import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfEvaluationFormRoutingModule } from './self-evaluation-form-routing.module';
import { SelfEvaluationFormComponent } from './self-evaluation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';


@NgModule({
  declarations: [
    SelfEvaluationFormComponent
  ],
  imports: [
    CommonModule,
    SelfEvaluationFormRoutingModule,
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
export class SelfEvaluationFormModule { }
