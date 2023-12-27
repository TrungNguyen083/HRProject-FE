import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationCycleManagementComponent } from './evaluation-cycle-management.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationCycleManagementComponent,
    data: { breadcrumbs: ['Evaluation Cycle Management'] },
    children: [
      {
        path: '',
        redirectTo: 'evaluation-cycle',
        pathMatch: 'full',
      },
      {
        path: 'evaluation-cycle',
        loadChildren: () =>
          import('./components/evaluation-cycle/evaluation-cycle.module').then(
            m => m.EvaluationCycleModule,
          ),
      },
      {
        path: 'evaluation-template',
        loadChildren: () =>
          import(
            './components/evaluation-template/evaluation-template.module'
          ).then(m => m.EvaluationTemplateModule),
      },
      {
        path: 'evaluation-rating-control',
        loadChildren: () =>
          import(
            './components/evaluation-rating-control/evaluation-rating-control.module'
          ).then(m => m.EvaluationRatingControlModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationCycleManagementRoutingModule {}
