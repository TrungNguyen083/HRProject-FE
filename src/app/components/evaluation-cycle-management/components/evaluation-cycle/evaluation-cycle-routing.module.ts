import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationCycleComponent } from './evaluation-cycle.component';
import { EvaluationCycleInfoFormComponent } from './components/evaluation-cycle-info-form/evaluation-cycle-info-form.component';

const routes: Routes = [{
  path: '',
  component: EvaluationCycleComponent,
  children: [
    {
      path: 'new-cycle',
      component: EvaluationCycleInfoFormComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationCycleRoutingModule { }
