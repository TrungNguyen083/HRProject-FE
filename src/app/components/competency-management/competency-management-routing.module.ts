import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetencyManagementComponent } from './competency-management.component';

const routes: Routes = [
  {
    path: '',
    component: CompetencyManagementComponent,
    data: { breadcrumbs: ['Competency Management'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetencyManagementRoutingModule {}
