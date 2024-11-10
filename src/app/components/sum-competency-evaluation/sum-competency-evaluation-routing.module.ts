import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SumCompetencyEvaluationComponent } from './sum-competency-evaluation.component';
import { EmployeeEvaluationFormComponent } from './components/competency-evaluation-form/components/employee-evaluation-form/employee-evaluation-form.component';
import { SelfEvaluationFormComponent } from './components/competency-evaluation-form/components/self-evaluation-form/self-evaluation-form.component';
import { FinalEvaluationFormComponent } from './components/competency-evaluation-form/components/final-evaluation-form/final-evaluation-form.component';
import { EvaluationListComponent } from './components/competency-progress/components/evaluation-list/evaluation-list.component';
import { CompetencyEvaluationFormComponent } from './components/competency-evaluation-form/competency-evaluation-form.component';

const routes: Routes = [{
  path: '',
  component: SumCompetencyEvaluationComponent,
  data: { breadcrumbs: ['Manager Competency Evaluation'] },
  children: [
    {
      path: '',
      redirectTo: 'competency-progress',
      pathMatch: 'full'
    },
    {
      path: 'competency-progress',
      component: EvaluationListComponent,
    },
    {
      path: 'evaluation-form',
      component: CompetencyEvaluationFormComponent,
      children: [
        {
          path: '',
          redirectTo: 'self-form',
          pathMatch: 'full',
        },
        {
          path: 'self-form',
          component: SelfEvaluationFormComponent
        },
        {
          path: 'employee-form',
          component: EmployeeEvaluationFormComponent
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
export class SumCompetencyEvaluationRoutingModule { }
