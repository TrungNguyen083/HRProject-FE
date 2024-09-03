import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationCycleComponent } from './evaluation-cycle.component';
import { EvaluationCycleInfoFormComponent } from './components/evaluation-cycle-info-form/evaluation-cycle-info-form.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { EvaluationCycleInfoForm2Component } from './components/evaluation-cycle-info-form2/evaluation-cycle-info-form2.component';


const routes: Routes = [{
  path: '',
  component: EvaluationCycleComponent,
  children: [
    {
      path: '',
      component: EvaluationListComponent,
    },
    {
      path: 'create-cycle-step1',
      component: EvaluationCycleInfoFormComponent
    },
    {
      path: 'create-cycle-step2',
      component: EvaluationCycleInfoForm2Component
    },


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationCycleRoutingModule { }
