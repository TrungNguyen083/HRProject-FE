import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ShareModule } from 'src/app/components/share/share.module';
import { EmployeeFileItemComponent } from './components/employee-file-item/employee-file-item.component';
import { EmployeeQualificationUploadModalComponent } from './components/employee-qualification-upload-modal/employee-qualification-upload-modal.component';
import { EmployeeQualificationsRoutingModule } from './employee-qualifications-routing.module';
import { EmployeeQualificationsComponent } from './employee-qualifications.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    EmployeeQualificationsComponent,
    EmployeeFileItemComponent,
    EmployeeQualificationUploadModalComponent,
  ],
  imports: [
    CommonModule,
    EmployeeQualificationsRoutingModule,
    ShareModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    MenuModule,
    DialogModule
  ],
})
export class EmployeeQualificationsModule {}
