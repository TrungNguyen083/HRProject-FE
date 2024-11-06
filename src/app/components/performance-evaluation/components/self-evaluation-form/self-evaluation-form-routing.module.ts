import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfEvaluationFormComponent } from './self-evaluation-form.component';

const routes: Routes = [{
  path: '',
  component: SelfEvaluationFormComponent,
  children: [
    {
      path: '',
      component: SelfEvaluationFormComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfEvaluationFormRoutingModule { }
