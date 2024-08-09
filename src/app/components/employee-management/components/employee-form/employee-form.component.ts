import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { NotificationService } from 'src/app/shared/message/notification.service';
import {
  loadDepartments,
  loadJobLevels,
  loadPositions,
} from 'src/app/store/actions/filter-data.actions';
import {
  selectDepartments,
  selectJobLevels,
  selectPositions,
} from 'src/app/store/selectors/filter-data.selectors';
import { EmployeeManagementService } from '../../services/employee-management.service';
import { concatMap, of } from 'rxjs';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Input() visible!: boolean;
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  imageFile!: File;
  addEmployeeForm!: FormGroup;
  employeeTypes = [
    {
      label: 'Full-time',
      value: 0,
    },
    {
      label: 'Part-time',
      value: 1,
    },
    { label: 'Internship', value: 2 },
  ];

  departmentOptions = this.store.select(selectDepartments);
  positionOptions = this.store.select(selectPositions);
  jobLevelOptions = this.store.select(selectJobLevels);
  tempImg = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private notificationService: NotificationService,
    private employeeService: EmployeeManagementService,
    private store: Store,
  ) { }

  get currentContract() {
    return this.addEmployeeForm.get('currentContract')?.value;
  }

  get formControls() {
    return this.addEmployeeForm.controls;
  }

  get emergencyContacts() {
    return this.addEmployeeForm.get('emergencyContacts') as FormArray;
  }

  get position() {
    return this.addEmployeeForm.get('position')?.value;
  }

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(loadPositions());
    this.store.dispatch(loadDepartments());
    this.store.dispatch(loadJobLevels());
  }
  initForm() {
    this.addEmployeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      currentContract: [0, Validators.required],
      gender: 'Male',
      department: '',
      twitterLink: '',
      facebookLink: '',
      linkedinLink: '',
      instagramLink: '',
      position: '',
      jobLevel: '',
      profileBio: '',
      emergencyContacts: this.fb.array([
        this.fb.group({
          firstName: ['', [Validators.required, Validators.maxLength(100)]],
          lastName: ['', [Validators.required, Validators.maxLength(100)]],
          phoneNumber: ['', Validators.required],
        }),
      ]),
    });
  }

  addEmergencyContact() {
    const newContact = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', Validators.required],
    });
    this.emergencyContacts.push(newContact);
  }

  removeEmergencyContact(index: number) {
    this.emergencyContacts.removeAt(index);
  }

  onUpload(f: File): void {
    const reader = new FileReader();
    this.fileUpload.clear();
    this.fileUpload.choose();
    this.imageFile = f;

    reader.onload = () => {
      const fileContent = reader.result as string;

      this.tempImg = fileContent;
      this.notificationService.successNotification(`Uploaded new photo`);
    };

    reader.readAsDataURL(f);
  }

  onSubmit() {
    const { department, position, dateOfBirth, jobLevel } =
      this.addEmployeeForm.value;
    const employee = {
      ...this.addEmployeeForm.value,
      departmentId: department.value,
      positionId: position.value,
      jobLevelId: jobLevel.value ?? 0,
      dateOfBirth: new Date(dateOfBirth).toISOString(),
    };

    delete employee.department;
    delete employee.position;
    delete employee.jobLevel;

    this.employeeService
      .addEmployee(employee)
      .pipe(
        concatMap((result) => {
          this.isLoading = true;

          const employeeId = result.data?.createProfile?.id;

          if (!this.imageFile || !employeeId) return of(undefined);
          return this.employeeService.uploadProfileImage(
            employeeId,
            this.imageFile,
          );
        }),
      )
      .subscribe(() => {
        this.isLoading = false;
        this.notificationService.successNotification(
          `Add employee successfully`,
        );
        this.ref.close();
      });
  }
}
