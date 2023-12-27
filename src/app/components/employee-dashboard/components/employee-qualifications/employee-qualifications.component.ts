import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeQualificationUploadModalComponent } from './components/employee-qualification-upload-modal/employee-qualification-upload-modal.component';
import { IQualificationFile } from './models/employee-qualification.model';

const dummies: IQualificationFile[] = [
  {
    "fileName": "PhucUdemy",
    "filePath": "ex.path.2",
    "fileType": {
      "id": 2,
      "name": "pdf",
      "iconUrl": "https://www.svgrepo.com/show/144578/pdf.svg"
    }
  },
  {
    "fileName": "PhucTOEIC",
    "filePath": "ex.path.1",
    "fileType": {
      "id": 1,
      "name": "docx",
      "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png"
    }
  },
  {
    "fileName": "PhucEdx",
    "filePath": "ex.path.3",
    "fileType": {
      "id": 2,
      "name": "pdf",
      "iconUrl": "https://www.svgrepo.com/show/144578/pdf.svg"
    }
  }
]
@Component({
  selector: 'app-employee-qualifications',
  templateUrl: './employee-qualifications.component.html',
  styleUrls: ['./employee-qualifications.component.scss'],
})
export class EmployeeQualificationsComponent {
  ref!: DynamicDialogRef;
  qualifications = dummies

  constructor(private dialogService: DialogService) {}

  openUploadModal() {
    this.ref = this.dialogService.open(EmployeeQualificationUploadModalComponent, {
      header: 'Upload Document',
      contentStyle: { overflow: 'auto' },
      width: '40vw',
    })
  }
}
