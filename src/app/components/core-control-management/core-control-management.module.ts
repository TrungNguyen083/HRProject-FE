import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreControlManagementRoutingModule } from './core-control-management-routing.module';
import { CoreControlManagementComponent } from './core-control-management.component';
import { ShareModule } from '../share/share.module';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
import { HrDashboardModule } from '../hr-dashboard/hr-dashboard.module';


@NgModule({
  declarations: [
    CoreControlManagementComponent,
  ],
  imports: [
    CommonModule,
    CoreControlManagementRoutingModule,
    ShareModule,
    AppTopbarModule,
    HrDashboardModule
  ]
})
export class CoreControlManagementModule { }
