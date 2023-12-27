import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileUpload } from 'primeng/fileupload';
import { concatMap, of } from 'rxjs';
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
import { prependImage } from 'src/app/utils/prependImage';
import { genders } from '../../constants/employee-management.constant';
import { IEmployee } from '../../models/employee-management.model';
import { EmployeeManagementService } from '../../services/employee-management.service';
import { loadEmployeeDetail } from '../../store/employee-management.actions';
import { selectEmployeeDetail } from '../../store/employee-management.selectors';
@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  employeeDetail$ = this.store.select(selectEmployeeDetail);
  defaultImg = 'assets/images/profile-image-default.jpg';
  isEditOn = false;
  profileForm!: FormGroup;
  genderOptions = genders;
  departmentOptions = this.store.select(selectDepartments);
  positionOptions = this.store.select(selectPositions);
  jobLevelOptions = this.store.select(selectJobLevels);
  tempImg = '';
  employeeId!: number;
  isLoading = false;
  prependImage = prependImage;
  imageFile!: File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private employeeService: EmployeeManagementService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadDepartments());
    this.store.dispatch(loadPositions());
    this.store.dispatch(loadJobLevels());

    this.route.queryParams.subscribe(params => {
      const editParam = params['mode'];
      this.isEditOn = editParam === 'edit' ? true : false;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getEmployeeDetail(+id);
        this.employeeId = +id;
      }
    });

    this.employeeDetail$.subscribe(employee => {
      if (!employee) return;
      this.initEmployeeForm(employee);
    });
  }

  getEmployeeDetail(id: number) {
    this.store.dispatch(loadEmployeeDetail({ id }));
  }

  initEmployeeForm(employee: IEmployee) {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      positionLevel,
      profileBio,
      department,
      twitterLink,
      facebookLink,
      instagramLink,
      linkedinLink,
      emergencyContacts,
      currentContract,
    } = employee;
    this.profileForm = this.fb.group({
      firstName: [firstName, [Validators.required, Validators.maxLength(100)]],
      lastName: [lastName, [Validators.required, Validators.maxLength(100)]],
      gender: [gender, Validators.required],
      dateOfBirth: [new Date(dateOfBirth), Validators.required],
      phoneNumber: [phoneNumber, Validators.required],
      address: [address, Validators.required],
      position: {
        label: positionLevel?.position.positionName,
        value: positionLevel?.position.id,
        hasLevel: positionLevel?.position.hasLevel,
        hasDepartment: positionLevel?.position.hasDepartment,
      },
      jobLevel: {
        label: positionLevel?.jobLevel?.jobLevelName,
        value: positionLevel?.jobLevel?.id,
      },
      profileBio: [profileBio, [Validators.maxLength(250)]],
      department: {
        label: department?.departmentName,
        value: department?.id,
      },
      twitterLink,
      facebookLink,
      instagramLink,
      linkedinLink,
      currentContract,
      emergencyContacts: this.fb.array([
        ...emergencyContacts.map(({ id, firstName, lastName, phoneNumber }) => {
          return this.fb.group({
            id,
            firstName: [
              firstName,
              [Validators.required, Validators.maxLength(100)],
            ],
            lastName: [
              lastName,
              [Validators.required, Validators.maxLength(100)],
            ],
            phoneNumber: [phoneNumber, Validators.required],
          });
        }),
      ]),
    });

    if (emergencyContacts.length === 0) {
      this.addEmergencyContact();
    }
  }
  get emergencyContacts() {
    return this.profileForm.get('emergencyContacts') as FormArray;
  }
  get position() {
    return this.profileForm.get('position')?.value;
  }

  addEmergencyContact() {
    const newContact = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    this.emergencyContacts.push(newContact);
  }

  removeEmergencyContact(index: number) {
    this.emergencyContacts.removeAt(index);
  }

  openEdit() {
    this.isEditOn = true;
  }
  closeEdit() {
    this.isEditOn = false;
    this.tempImg = '';
  }

  onUpdateEmployee(): void {
    const { department, position, dateOfBirth, jobLevel } =
      this.profileForm.value;
    const updatedEmployee = {
      ...this.profileForm.value,
      departmentId: department.value ?? 0,
      positionId: position.value,
      dateOfBirth: new Date(dateOfBirth).toISOString(),
      jobLevelId: position.hasLevel ? jobLevel.value : 0,
      id: this.employeeId,
      currentContract: 0,
    };

    delete updatedEmployee.department;
    delete updatedEmployee.position;
    delete updatedEmployee.jobLevel;

    this.employeeService
      .updateEmployee(updatedEmployee)
      .pipe(
        concatMap(() => {
          this.isLoading = true;

          if (!this.imageFile) return of(undefined);
          return this.employeeService.uploadProfileImage(
            this.employeeId,
            this.imageFile,
          );
        }),
      )
      .subscribe(() => {
        this.isLoading = false;
        this.isEditOn = false;
        this.getEmployeeDetail(this.employeeId);
        this.notificationService.successNotification(
          `Update employee successfully`,
        );
      });
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
}
