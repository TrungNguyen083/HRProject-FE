import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HrmsAvatarComponent } from '../share/hrms-avatar/hrms-avatar.component';
import { ShareModule } from '../share/share.module';
import { ContractBadgeComponent } from './components/contract-badge/contract-badge.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeCarouselComponent } from './components/employee-carousel/employee-carousel.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeItemComponent } from './components/employee-item/employee-item.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeManagementComponent } from './employee-management.component';
import { EmployeeManagementService } from './services/employee-management.service';
import { EmployeeEffects } from './store/employee-management.effects';
import { employeeesReducer } from './store/employee-management.reducer';
import { EmployeeStore } from './store/employee-management.store.service';
import { AppTopbarModule } from 'src/app/layout/app-topbar.module';
@NgModule({
  declarations: [
    EmployeeManagementComponent,
    EmployeeListComponent,
    EmployeeItemComponent,
    EmployeeDetailComponent,
    EmployeeFormComponent,
    EmployeeCardComponent,
    EmployeeCarouselComponent,
    ContractBadgeComponent,
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    RouterModule,
    ShareModule,
    AvatarModule,
    TableModule,
    ButtonModule,
    MenuModule,
    AppTopbarModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    RadioButtonModule,
    InputMaskModule,
    InputTextareaModule,
    CarouselModule,
    HrmsAvatarComponent,
    StoreModule.forFeature('employees', employeeesReducer),
    EffectsModule.forFeature([EmployeeEffects])
  ],
  providers: [EmployeeManagementService, EmployeeStore ],
})
export class EmployeeManagementModule {}
