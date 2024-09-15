import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationTemplateComponent } from './evaluation-template.component';
import { EvaluationTemplateListComponent } from './components/evaluation-template-list/evaluation-template-list.component';
import { EvaluationTemplateFormComponent } from './components/evaluation-template-form/evaluation-template-form.component';

const routes: Routes = [{
  path: '',
  component: EvaluationTemplateComponent,
  children: [
    {
      path: '',
      component: EvaluationTemplateListComponent,
    },
    {
      path: 'new-template',
      component: EvaluationTemplateFormComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationTemplateRoutingModule { }
