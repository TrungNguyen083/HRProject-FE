import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceEvaluationComponent } from './performance-evaluation.component';

const routes: Routes = [{
  path: '',
  component: PerformanceEvaluationComponent,
  data: { breadcrumbs: ['Performance Evaluation'] },
  children: [
    {
      path: '',
      redirectTo: 'self-evaluation-form',
      pathMatch: 'full',
    },
    {
      path: 'self-evaluation-form',
      loadChildren: () => import('./components/self-evaluation-form/self-evaluation-form.module')
        .then(m => m.SelfEvaluationFormModule),
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
export class PerformanceEvaluationRoutingModule { }
