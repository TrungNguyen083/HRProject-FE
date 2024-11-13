import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetencyBaselineComponent } from './competency-baseline.component';

const routes: Routes = [{
  path: '',
  component: CompetencyBaselineComponent,
  children: [
    {
      path: '',
      component: CompetencyBaselineComponent,
    },
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetencyBaselineRoutingModule { }
