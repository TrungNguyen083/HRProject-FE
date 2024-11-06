import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalEvaluationFormComponent } from './final-evaluation-form.component';

const routes: Routes = [{
  path: '',
  component: FinalEvaluationFormComponent,
  children: [
    {
      path: '',
      component: FinalEvaluationFormComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalEvaluationFormRoutingModule { }
