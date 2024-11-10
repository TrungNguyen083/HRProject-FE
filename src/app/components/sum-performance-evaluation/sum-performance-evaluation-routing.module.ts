import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SumPerformanceEvaluationComponent } from './sum-performance-evaluation.component';
import { EvaluationListComponent } from './components/performance-progress/components/evaluation-list/evaluation-list.component';
import { EmployeeEvaluationFormComponent } from './components/performance-evaluation-form/components/employee-evaluation-form/employee-evaluation-form.component';
import { SelfEvaluationFormComponent } from './components/performance-evaluation-form/components/self-evaluation-form/self-evaluation-form.component';
import { FinalEvaluationFormComponent } from './components/performance-evaluation-form/components/final-evaluation-form/final-evaluation-form.component';
import { PerformanceEvaluationFormComponent } from './components/performance-evaluation-form/performance-evaluation-form.component';

const routes: Routes = [{
  path: '',
  component: SumPerformanceEvaluationComponent,
  data: { breadcrumbs: ['Manager Performance Evaluation'] },
  children: [
    {
      path: '',
      redirectTo: 'performance-progress',
      pathMatch: 'full'
    },
    {
      path: 'performance-progress',
      component: EvaluationListComponent,
    },
    {
      path: 'evaluation-form',
      component: PerformanceEvaluationFormComponent,
      children: [
        {
          path: '',
          redirectTo: 'self-form',
          pathMatch: 'full',
        },
        {
          path: 'self-form',
          component: EmployeeEvaluationFormComponent
        },
        {
          path: 'employee-form',
          component: SelfEvaluationFormComponent
        },
        {
          path: 'final-form',
          component: FinalEvaluationFormComponent
        }
      ]
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SumPerformanceEvaluationRoutingModule { }
