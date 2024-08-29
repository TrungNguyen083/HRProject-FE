import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { of, switchMap, take } from 'rxjs';
import { EmployeeDashboardStore } from 'src/app/components/employee-dashboard/store/employee-dashboard-store.service';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { EmployeeQualificationService } from '../../services/employee-qualification-service.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-employee-qualification-upload-modal',
  templateUrl: './employee-qualification-upload-modal.component.html',
  styleUrls: ['./employee-qualification-upload-modal.component.scss'],
})
export class EmployeeQualificationUploadModalComponent {
  fileName = '';
  tempImg = '';
  file!: File;
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  @ViewChild('nameInput') nameInput!: ElementRef;
  isLoading = false;


  constructor(
    private notificationService: NotificationService, 
    private eDashboardStore: EmployeeDashboardStore,
    private eQualificationService: EmployeeQualificationService,
    public ref: DynamicDialogRef,
  ) {}

  onUpload(f: File) {
    const reader = new FileReader()
    this.fileUpload.clear();
    this.fileUpload.choose();
    this.file = f;

    reader.onload = () => {
      const fileContent = reader.result as string;

      this.tempImg = fileContent;
      this.notificationService.successNotification(`Uploaded new photo`);
    };

    reader.readAsDataURL(f);
  }

  onSubmit() {
    const title = this.nameInput.nativeElement.value;
    console.log("Title:", title);
    this.eDashboardStore.employeeId$.pipe(
      take(1),
      switchMap(employeeId => {
        if (!employeeId || !this.file) {
          return of(undefined);
        }
        return this.eQualificationService.uploadQualification(employeeId, this.file, title);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.notificationService.successNotification(
            `Upload successfully`,
          );
          this.ref.close();
        }
      },
      error: (err) => {
        this.notificationService.errorNotification(
          'Upload failed. Please try again.',
        );
      }
    });
  }

  bytesToKilobytes(bytes: number) {
    const kilobytes = bytes / 1024;
    return kilobytes.toFixed(2);
  }
}
