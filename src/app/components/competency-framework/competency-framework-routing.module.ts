import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetencyFrameworkComponent } from './competency-framework.component';
import { CompetencyTreeComponent } from './components/competency-tree/competency-tree.component';
import { CompetencyCreateFormComponent } from './components/competency-create-form/competency-create-form.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';


const routes: Routes = [
  {
    path: '',
    component: CompetencyFrameworkComponent,
    data: { breadcrumbs: ['Competency Framework'] },
    children: [
      {
        path: '',
        component: CompetencyTreeComponent,
      },
      {
        path: 'add-group',
        component: CompetencyCreateFormComponent
      },
      {
        path: 'add-competency',
        component: GroupCreateFormComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetencyFrameworkRoutingModule {}
