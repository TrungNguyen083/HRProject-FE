import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetencyTreeComponent } from './components/competency-matrix/components/competency-tree/competency-tree.component';
import { CompetencyCreateFormComponent } from './components/competency-matrix/components/competency-create-form/competency-create-form.component';
import { GroupCreateFormComponent } from './components/competency-matrix/components/group-create-form/group-create-form.component';
import { CompetencyFrameworkRoutingModule } from './competency-framework-routing.module';
import { RouterModule } from '@angular/router';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { CompetencyFrameworkComponent } from './competency-framework.component';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HrDashboardModule } from '../hr-dashboard/hr-dashboard.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ShareModule } from '../share/share.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



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
    ShareModule,
    AppTopbarModule,
    HrDashboardModule,
    RouterModule,
    TreeTableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class CompetencyFrameworkModule { }
