import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { AppSidebarHrComponent } from './app-sidebar-hr.component';
import { AppSidebarEmployeeComponent } from './app-sidebar-employee.component';
@NgModule({
  declarations: [
    AppLayoutComponent,
    AppSidebarHrComponent,
    AppSidebarEmployeeComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
