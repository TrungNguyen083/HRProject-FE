import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeQualificationUploadModalComponent } from './components/employee-qualification-upload-modal/employee-qualification-upload-modal.component';
import { IQualificationFile } from './models/employee-qualification.model';
import { EmployeeQualificationStore } from './store/employee-qualification-store.service';
import { EmployeeDashboardStore } from '../../store/employee-dashboard-store.service';


@Component({
  selector: 'app-employee-qualifications',
  templateUrl: './employee-qualifications.component.html',
  styleUrls: ['./employee-qualifications.component.scss'],
})
export class EmployeeQualificationsComponent implements OnInit {
  ref!: DynamicDialogRef;
  qualifications!: IQualificationFile[];

  constructor(
    private dialogService: DialogService,
    private eQualificationStore: EmployeeQualificationStore,
    private eDashboardStore: EmployeeDashboardStore
  ) { }

  ngOnInit(): void {
    this.eDashboardStore.employeeId$.subscribe(employeeId => {
      if (!employeeId) return;
      this.eQualificationStore.getEmployeeQualifications(employeeId);
      this.eQualificationStore.employeeQualifications$.subscribe(qualifications => {
        this.qualifications = qualifications;
      })
    })
  }

  openUploadModal() {
    this.ref = this.dialogService.open(EmployeeQualificationUploadModalComponent, {
      header: 'Upload Qualification',
      contentStyle: { overflow: 'auto' },
      width: '40vw',
    });

    this.ref.onClose.subscribe(() => {
      this.reloadQualifications();
    });
  }

  private reloadQualifications() {
    this.eDashboardStore.employeeId$.subscribe(employeeId => {
      if (!employeeId) return;
      this.eQualificationStore.getEmployeeQualifications(employeeId);
    });
  }
}
