import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetencyFrameworkComponent } from './competency-framework.component';


const routes: Routes = [
  {
    path: '',
    component: CompetencyFrameworkComponent,
    data: { breadcrumbs: ['Competency Framework'] },
    children: [
      {
        path: '',
        redirectTo: 'competency-matrix',
        pathMatch: 'full',
      },
      {
        path: 'competency-matrix',
        loadChildren: () =>
          import('./components/competency-matrix/competency-matrix.module').then(
            m => m.CompetencyMatrixModule,
          ),
      },
      {
        path: 'competency-baseline',
        loadChildren: () =>
          import('./components/competency-baseline/competency-baseline.module').then(
            m => m.CompetencyBaselineModule,
          ),
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetencyFrameworkRoutingModule { }
