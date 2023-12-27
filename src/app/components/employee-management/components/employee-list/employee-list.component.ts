import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Store } from '@ngrx/store';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { PageChangeEvent } from 'src/app/components/share/models/pagingInfo.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { loadDepartments } from 'src/app/store/actions/filter-data.actions';
import { selectDepartments } from 'src/app/store/selectors/filter-data.selectors';
import { configPagination } from 'src/app/utils/configPagination';
import {
  currentContracts,
  employeeLabelItems,
  employeeTableCols,
} from '../../constants/employee-management.constant';
import {
  IEmployee,
  IEmployeeParams,
} from '../../models/employee-management.model';
import { loadEmployees } from '../../store/employee-management.actions';
import { selectEmployees } from '../../store/employee-management.selectors';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeListComponent implements OnInit {
  labelItems: MenuItem[] = employeeLabelItems;
  activeItem: MenuItem = this.labelItems[0];
  employees$ = this.store.select(selectEmployees);
  departments$ = this.store.select(selectDepartments);
  tableData: HrmsTable<IEmployee> = {
    ...defaultTablePagination,
    data: {
      header: employeeTableCols,
      body: [],
    },
  };
  filterForm!: FormGroup;
  contractOptions = currentContracts;
  ref!: DynamicDialogRef;
  employeeParams: IEmployeeParams = { pagingInfo: { pageNo: 1 } };
  gapPageNumber = 1;

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.getEmployees();

    this.employees$.subscribe(result => {
      const pagination = configPagination(result.pagination);
      const tData = {
        ...pagination,
        data: {
          header: [...this.tableData.data.header],
          body: result.data,
        },
      };
      this.tableData = tData;
    });

    this.initFilterForm();
  }

  get departmentIds() {
    return this.filterForm.get('departmentIds')?.value;
  }
  get currentContracts() {
    return this.filterForm.get('currentContracts')?.value;
  }

  getEmployees() {
    this.store.dispatch(loadEmployees({ params: this.employeeParams }));
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      departmentIds: '',
      currentContracts: '',
    });
  }
  searchValue(search: string): void {
    this.handleEmployeeParams('name', search);
    this.getEmployees();
  }
  onPageChange(e: PageChangeEvent): void {
    // this.handleEmployeeParams('pageNo', e.page + this.gapPageNumber);
    this.employeeParams = {
      ...this.employeeParams,
      pagingInfo: {
        ...this.employeeParams.pagingInfo,
        pageNo: e.page + this.gapPageNumber,
      },
    };
    this.getEmployees();
  }

  onActiveItemChange(label: MenuItem): void {
    this.activeItem = label;
    if (this.activeItem.id) {
      this.handleEmployeeParams(
        'status',
        +this.activeItem.id,
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status, ...newEmployeeParams } = this.employeeParams;
      this.employeeParams = newEmployeeParams;
    }

    this.getEmployees();
  }

  onFilter() {
    const formValues = this.filterForm.value;

    for (const key in formValues) {
      const value = formValues[key];
      if (value) {
        this.handleEmployeeParams(key, value);
      }
    }

    this.getEmployees();
  }

  handleEmployeeParams(
    key: string,
    value: string | number | Date | string[] | boolean,
  ): void {
    this.employeeParams = {
      ...this.employeeParams,
      [key]: value,
    };
  }
  openAddEmployeeModal() {
    this.ref = this.dialogService.open(EmployeeFormComponent, {
      header: 'Create profile',
      contentStyle: { overflow: 'auto' },
      width: '60vw',
    });
  }

  handleClearAll() {
    this.filterForm.setValue({
      departmentIds: [],
      currentContracts: [],
    });
    this.onFilter();
  }

  isClearAllVisible() {
    return this.departmentIds.length || this.currentContracts.length;
  }
  getDepartment() {
    this.store.dispatch(loadDepartments());
  }
}
