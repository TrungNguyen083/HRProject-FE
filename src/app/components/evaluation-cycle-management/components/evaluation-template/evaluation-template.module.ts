import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationTemplateRoutingModule } from './evaluation-template-routing.module';
import { EvaluationTemplateComponent } from './evaluation-template.component';
import { ShareModule } from 'src/app/components/share/share.module';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { EvaluationTemplateCardComponent } from './components/evaluation-template-card/evaluation-template-card.component';


@NgModule({
  declarations: [
    EvaluationTemplateComponent,
    EvaluationTemplateCardComponent
  ],
  imports: [
    CommonModule,
    EvaluationTemplateRoutingModule,
    ShareModule,
    DropdownModule,
    ButtonModule
  ]
})
export class EvaluationTemplateModule { }
