import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IEmployeeInfo, IEmployeeParams } from 'src/app/components/employee-management/models/employee-management.model';
import { IDropdownItem, PaginatedData } from 'src/app/models/global.model';
import { EmployeeStore } from 'src/app/components/employee-management/store/employee-management.store.service';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { IAssignUserParams } from '../../models/system-admin.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SystemAdminService } from '../../services/system-admin.service';
import { EmployeeAccountStore } from '../../store/userAccount.store.service';
import { NotificationService } from 'src/app/shared/message/notification.service';

@Component({
  selector: 'app-user-assign-form',
  templateUrl: './user-assign-form.component.html',
  styleUrls: ['./user-assign-form.component.scss'],
  providers: [EmployeeStore, EmployeeAccountStore],
})
export class UserAssignFormComponent implements OnInit {
  userId = this.config.data.userId;
  assignUserForm: FormGroup;
  filterValue: FormControl;
  isLoading: boolean = false;
  employeeOptions!: IDropdownItem[];
  employeeParams: IEmployeeParams = { pageNo: 1, pageSize: 1000 };
  employees!: PaginatedData<IEmployeeInfo>

  constructor(
    private fb: FormBuilder,
    private employeeStore: EmployeeStore,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private systemAdminService: SystemAdminService,
    private notificationService: NotificationService,
  ) {
    this.assignUserForm = this.fb.group({
      employee: [null, Validators.required],
      filterValue: ['']  // Add filter control here
    });
    this.filterValue = this.assignUserForm.get('filterValue') as FormControl;
  }

  ngOnInit(): void {
    this.employeeStore.getEmployees(this.employeeParams);
    this.employeeStore.employees$.subscribe((employees: PaginatedData<IEmployeeInfo>) => {
      this.employeeOptions = employees.data.map(e => ({
        label: `${e.employee.firstName} ${e.employee.lastName}`,
        value: e.employee.id,
        urlImage: e.imageUrl
      }));

      this.employees = employees;
    });

    this.initForm();
  }

  initForm() {
    this.assignUserForm = this.fb.group({
      employee: ['', Validators.required],
      filterValue: ['']
    });
  }

  resetFunction(options: DropdownFilterOptions) {
    if (options && options.reset) {
      options.reset();
    }
    this.filterValue.setValue('');
  }

  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
    if (options && typeof options.filter === 'function') {
      options.filter(event);
    }
  }

  onAssign(): void {
    if (this.assignUserForm.invalid) {
      return;
    }
    this.isLoading = true;
    const selectedEmployee = this.assignUserForm.value.employee;

    const assignUData: IAssignUserParams = {
      userId: this.userId,
      employeeId: selectedEmployee.value
    };

    this.systemAdminService
      .assignUser(assignUData)
      .pipe(o$ => {
        this.isLoading = true;
        return o$;
      })
      .subscribe(() => {
        this.isLoading = false;
        this.notificationService.successNotification(
          $localize`Update account successfully`,
        );
        this.ref.close({success: true});
      });

    
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
