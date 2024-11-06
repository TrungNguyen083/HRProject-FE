import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationFormComponent } from './evaluation-form.component';

const routes: Routes = [{
  path: '',
  component: EvaluationFormComponent,
  children: [
    {
      path: '',
      component: EvaluationFormComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationFormRoutingModule { }
