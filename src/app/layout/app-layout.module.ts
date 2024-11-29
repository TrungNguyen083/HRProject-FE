import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { AppSidebarHrComponent } from './app-sidebar-hr.component';
import { AppSidebarEmployeeComponent } from './app-sidebar-employee.component';
import { AppSidebarSumComponent } from './app-sidebar-sum.component';
import { AppSidebarAdminComponent } from './app-sidebar-admin.component';
import { AppSidebarComponent } from './app-sidebar.component';
@NgModule({
  declarations: [
    AppLayoutComponent,
    AppSidebarHrComponent,
    AppSidebarEmployeeComponent,
    AppSidebarSumComponent,
    AppSidebarAdminComponent,
    AppSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule { }
