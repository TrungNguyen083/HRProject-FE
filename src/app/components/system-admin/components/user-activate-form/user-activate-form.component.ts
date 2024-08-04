import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDropdownItem } from 'src/app/models/global.model';
import { EmployeeAccountStore } from '../../store/userAccount.store.service';
import { SystemAdminService } from '../../services/system-admin.service';
import { IUpdateAccountParams } from '../../models/system-admin.model';
import { NotificationService } from 'src/app/shared/message/notification.service';
import '@angular/localize/init';

@Component({
  selector: 'app-user-activate-form',
  templateUrl: './user-activate-form.component.html',
  styleUrls: ['./user-activate-form.component.scss'],
  providers: [EmployeeAccountStore],
})
export class UserActivateFormComponent implements OnInit {
  userId = this.config.data.userId;
  roleOptions!: IDropdownItem[];
  activateOptions = [
    {
      label: 'Enable',
      value: true,
    },
    {
      label: 'Disable',
      value: false,
    },
  ];
  activateUserForm!: FormGroup;
  isLoading = false;
  user$ = this.accountStore.user$;

  constructor(
    private accountStore: EmployeeAccountStore,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private systemAdminService: SystemAdminService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.accountStore.getRoles();
    this.accountStore.roles$.subscribe(roles => {
      this.roleOptions = roles.map(r => {
        return {
          label: r.name,
          value: r.roleId,
        };
      });
    });

    this.initForm();
  }

  initForm() {
    this.activateUserForm = this.fb.group({
      roleId: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onActivate() {
    const { roleId, status } = this.activateUserForm.value;
    
    const updateData: IUpdateAccountParams = {
      roleId,
      status,
      userId: this.userId,
    };

    this.systemAdminService
      .updateUsers(updateData)
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
  }
}
