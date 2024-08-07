import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IAccountParams, IEmployeeAccount } from '../../models/system-admin.model';
import { EmployeeAccountStore } from '../../store/userAccount.store.service';
import { UpdaterUserFormComponent } from '../updater-user-form/updater-user-form.component';
import { UserActivateFormComponent } from '../user-activate-form/user-activate-form.component';
import { UserAssignFormComponent } from '../user-assign-form/user-assign-form.component';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit, OnChanges {
  @HostBinding('class') hostClass = 'hrms-user-item';
  @Input() employeeAccount!: IEmployeeAccount;
  menuItems!: MenuItem[];
  defaultImg = 'assets/images/profile-image-default.jpg';
  modalRef!: DynamicDialogRef;
  accountParams: IAccountParams = { pageNo: 1 };

  constructor(
    private accountStore: EmployeeAccountStore,
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('employeeAccount' in changes) {
      const newAccount = changes['employeeAccount'].currentValue;
      if (newAccount) {
        this.menuItems = [
          {
            label: 'Update',
            icon: 'pi pi-pencil',
            command: () => {
              this.modalRef = this.dialogService.open(
                UpdaterUserFormComponent,
                {
                  header: 'Change password',
                  contentStyle: { overflow: 'auto' },
                  width: '30vw',
                  data: { userId: this.employeeAccount.userId },
                },
              );

              this.modalRef.onClose.subscribe(({ success }) => {
                if (!success) return;
                this.accountStore.getEmployeeAccounts({
                  pageNo: 1
                });
              });
            },
          },
        ];
      }
    }
  }
  handleEmployeeDetail() {
    return '';
  }

  onActives() {
    this.modalRef = this.dialogService.open(UserActivateFormComponent, {
      header: 'Update Fields',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
      data: {
        userId: this.employeeAccount.userId,
      },
    });

    this.modalRef.onClose.subscribe(({ success }) => {
      if (!success) return;
      this.accountStore.getEmployeeAccounts(this.accountParams);
    });
  }

  onAssign() {
    this.modalRef = this.dialogService.open(UserAssignFormComponent, {
      header: 'Assign User',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
      data: {
        userId: this.employeeAccount.userId,
      },
    });

    this.modalRef.onClose.subscribe(({ success }) => {
      if (!success) return;
      this.accountStore.getEmployeeAccounts(this.accountParams);
    });
  }
}
