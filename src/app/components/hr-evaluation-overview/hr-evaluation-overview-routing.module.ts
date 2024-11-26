import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrEvaluationOverviewComponent } from './hr-evaluation-overview.component';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { CompetencyFormComponent } from './components/evaluation-form/components/competency-form/competency-form.component';
import { PerformanceFormComponent } from './components/evaluation-form/components/performance-form/performance-form.component';
import { EvaluationListComponent } from './components/evaluation-result/components/evaluation-list/evaluation-list.component';
import { PromotionListComponent } from './components/evaluation-promotion/components/promotion-list/promotion-list.component';
import { EvaluationCompareComponent } from './components/evaluation-compare/evaluation-compare.component';

const routes: Routes = [{
  path: '',
  component: HrEvaluationOverviewComponent,
  data: { breadcrumbs: ['Evaluation Overview'] },
  children: [
    {
      path: '',
      redirectTo: 'evaluation-result',
      pathMatch: 'full'
    },
    {
      path: 'evaluation-result',
      component: EvaluationListComponent,
    },
    {
      path: 'evaluation-form',
      component: EvaluationFormComponent,
      children: [
        {
          path: '',
          redirectTo: 'competency-form',
          pathMatch: 'full',
        },
        {
          path: 'competency-form',
          component: CompetencyFormComponent
        },
        {
          path: 'performance-form',
          component: PerformanceFormComponent
        }
      ]
    },
    {
      path: 'evaluation-promotion',
      component: PromotionListComponent,
    },
    {
      path: 'evaluation-compare',
      component: EvaluationCompareComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrEvaluationOverviewRoutingModule { }
