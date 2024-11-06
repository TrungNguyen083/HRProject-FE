import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalEvaluationFormRoutingModule } from './final-evaluation-form-routing.module';
import { FinalEvaluationFormComponent } from './final-evaluation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';


@NgModule({
  declarations: [
    FinalEvaluationFormComponent
  ],
  imports: [
    CommonModule,
    FinalEvaluationFormRoutingModule,
    AccordionModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
  ]
})
export class FinalEvaluationFormModule { }
