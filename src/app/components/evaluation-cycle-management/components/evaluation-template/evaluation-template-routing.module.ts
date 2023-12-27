import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationTemplateComponent } from './evaluation-template.component';

const routes: Routes = [{
  path: '',
  component: EvaluationTemplateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationTemplateRoutingModule { }
