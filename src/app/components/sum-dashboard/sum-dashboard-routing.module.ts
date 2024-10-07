import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SumDashboardComponent } from './sum-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SumDashboardComponent,
    data: { breadcrumbs: ['Dashboard'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SumDashboardRoutingModule {}
