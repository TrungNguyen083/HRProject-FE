import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerEvaluationFormComponent } from './manager-evaluation-form.component';

const routes: Routes = [{
  path: '',
  component: ManagerEvaluationFormComponent,
  children: [
    {
      path: '',
      component: ManagerEvaluationFormComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerEvaluationFormRoutingModule { }
