import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetencyTreeComponent } from './components/competency-tree/competency-tree.component';
import { CompetencyCreateFormComponent } from './components/competency-create-form/competency-create-form.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';
import { CompetencyFrameworkRoutingModule } from './competency-framework-routing.module';
import { RouterModule } from '@angular/router';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { CompetencyFrameworkComponent } from './competency-framework.component';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompetencyFrameworkComponent,
    CompetencyTreeComponent,
    CompetencyCreateFormComponent,
    GroupCreateFormComponent,
  ],
  imports: [
    CommonModule,
    CompetencyFrameworkRoutingModule,
    RouterModule,
    AppTopbarModule,
    TreeTableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CompetencyFrameworkModule { }
