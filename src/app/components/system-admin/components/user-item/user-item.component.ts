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

import { IEmployeeAccount } from '../../models/system-admin.model';
import { EmployeeAccountStore } from '../../store/userAccount.store.service';
import { UpdaterUserFormComponent } from '../updater-user-form/updater-user-form.component';
import { CheckboxChangeEvent } from 'primeng/checkbox';
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
  checked = false;
  selectedAccountIds$ = this.accountStore.selectedAccountIds$;
  updateUserModal!: DynamicDialogRef;

  constructor(
    private accountStore: EmployeeAccountStore,
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.selectedAccountIds$.subscribe(accountIds => {
      this.checked = accountIds.includes(this.employeeAccount.userId);
    });
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
              this.updateUserModal = this.dialogService.open(
                UpdaterUserFormComponent,
                {
                  header: 'Change password',
                  contentStyle: { overflow: 'auto' },
                  width: '30vw',
                  data: { userId: this.employeeAccount.userId },
                },
              );

              this.updateUserModal.onClose.subscribe(({ success }) => {
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

  onCheckChange(e: CheckboxChangeEvent) {
    const { checked } = e;

    if (checked) {
      this.accountStore.addAccount(this.employeeAccount.userId);
    } else {
      this.accountStore.removeAccount(this.employeeAccount.userId);
    }
  }
}
