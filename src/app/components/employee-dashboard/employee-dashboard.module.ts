import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { ShareModule } from '../share/share.module';
import { EmployeeInfoCardComponent } from './components/employee-info-card/employee-info-card.component';
import { JobTagComponent } from './components/job-tag/job-tag.component';
import { EmployeeDashboardRoutingModule } from './employee-dashboard-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { AppSidebarEmployeeComponent } from 'src/app/layout/app-sidebar-employee.component';

@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    EmployeeInfoCardComponent,
    JobTagComponent,
    AppSidebarEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeDashboardRoutingModule,
    ShareModule,
    AppTopbarModule,
    ButtonModule,
  ],
  exports: [
    AppSidebarEmployeeComponent
  ]
})
export class EmployeeDashboardModule { }
