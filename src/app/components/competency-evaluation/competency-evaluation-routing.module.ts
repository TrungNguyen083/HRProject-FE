import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetencyEvaluationComponent } from './competency-evaluation.component';

const routes: Routes = [{
  path: '',
  component: CompetencyEvaluationComponent,
  data: { breadcrumbs: ['Competency Evaluation'] },
  children: [
    {
      path: '',
      redirectTo: 'evaluation-form',
      pathMatch: 'full',
    },
    {
      path: 'evaluation-form',
      loadChildren: () => import('./components/evaluation-form/evaluation-form.module')
        .then(m => m.EvaluationFormModule),
    },
    {
      path: 'manager-evaluation-form',
      loadChildren: () => import('./components/manager-evaluation-form/manager-evaluation-form.module')
        .then(m => m.ManagerEvaluationFormModule),
    },
    {
      path: 'final-evaluation-form',
      loadChildren: () => import('./components/final-evaluation-form/final-evaluation-form.module')
        .then(m => m.FinalEvaluationFormModule),
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetencyEvaluationRoutingModule { }
