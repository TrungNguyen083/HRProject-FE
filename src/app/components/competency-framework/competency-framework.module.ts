import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetencyFrameworkRoutingModule } from './competency-framework-routing.module';
import { CompetencyTreeComponent } from './components/competency-tree/competency-tree.component';
import { CompetencyCreateFormComponent } from './components/competency-create-form/competency-create-form.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';



@NgModule({
  declarations: [
    CompetencyTreeComponent,
    CompetencyCreateFormComponent,
    GroupCreateFormComponent
  ],
  imports: [
    CommonModule,
    CompetencyFrameworkRoutingModule
  ]
})
export class CompetencyFrameworkModule { }
