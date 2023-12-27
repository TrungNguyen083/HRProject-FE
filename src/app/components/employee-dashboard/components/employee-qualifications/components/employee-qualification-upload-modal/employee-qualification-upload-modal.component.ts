import { Component, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { NotificationService } from 'src/app/shared/message/notification.service';

@Component({
  selector: 'app-employee-qualification-upload-modal',
  templateUrl: './employee-qualification-upload-modal.component.html',
  styleUrls: ['./employee-qualification-upload-modal.component.scss'],
})
export class EmployeeQualificationUploadModalComponent {
  fileName = '';
  file!: File;
  @ViewChild('fileUpload') fileUpload!: FileUpload;


  constructor(private notificationService: NotificationService) {}

  onUpload(f: File) {
    const reader = new FileReader()
    this.fileUpload.clear();
    this.fileUpload.choose();
    this.file = f;

    reader.onload = () => {
      this.notificationService.successNotification($localize`Uploaded new file`)
    }

    reader.readAsDataURL(f);
  }

  bytesToKilobytes(bytes: number) {
    const kilobytes = bytes / 1024;
    return kilobytes.toFixed(2);
  }
}
