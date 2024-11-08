import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationTemplateRoutingModule } from './evaluation-template-routing.module';
import { EvaluationTemplateComponent } from './evaluation-template.component';
import { ShareModule } from 'src/app/components/share/share.module';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { EvaluationTemplateCardComponent } from './components/evaluation-template-card/evaluation-template-card.component';
import { EvaluationTemplateListComponent } from './components/evaluation-template-list/evaluation-template-list.component';
import { EvaluationTemplateFormComponent } from './components/evaluation-template-form/evaluation-template-form.component';
import { EvaluationTemplateStore } from './stores/evaluation-template.store';
import { EvaluationTemplateService } from './services/evaluation-template.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EvaluationTemplateComponent,
    EvaluationTemplateCardComponent,
    EvaluationTemplateListComponent,
    EvaluationTemplateFormComponent
  ],
  imports: [
    CommonModule,
    EvaluationTemplateRoutingModule,
    ShareModule,
    DropdownModule,
    ButtonModule,
    FormsModule
  ],
  providers: [EvaluationTemplateStore, EvaluationTemplateService]
})
export class EvaluationTemplateModule { }
