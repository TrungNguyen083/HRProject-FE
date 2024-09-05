import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetencyFrameworkComponent } from './competency-framework.component';

const routes: Routes = [
  {
    path: '',
    component: CompetencyFrameworkComponent,
    data: { breadcrumbs: ['Competency Framework'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetencyFrameworkRoutingModule {}
