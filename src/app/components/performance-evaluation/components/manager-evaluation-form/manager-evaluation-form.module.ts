import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerEvaluationFormRoutingModule } from './manager-evaluation-form-routing.module';
import { ManagerEvaluationFormComponent } from './manager-evaluation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';


@NgModule({
  declarations: [
    ManagerEvaluationFormComponent
  ],
  imports: [
    CommonModule,
    ManagerEvaluationFormRoutingModule,
    AccordionModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
  ]
})
export class ManagerEvaluationFormModule { }
