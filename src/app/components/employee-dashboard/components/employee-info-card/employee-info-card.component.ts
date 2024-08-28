import { Component, OnInit } from '@angular/core';
import { EmployeeDashboardStore } from '../../store/employee-dashboard-store.service';
import _ from 'lodash';

@Component({
  selector: 'employee-info-card',
  templateUrl: './employee-info-card.component.html',
  styleUrls: ['./employee-info-card.component.scss'],
})
export class EmployeeInfoCardComponent implements OnInit {
  employeeId!: number;
  firstName!: string;
  lastName!: string;
  profileImgUri!: string;
  position!: string;
  level!: string;
  address!: string;
  defaultImg = 'assets/images/avatar-default.jpg';
  skills!: string[];
  certification!: string[];
  employeeOverview$ = this.dashboardStore.employeeOverview$;

  constructor(private dashboardStore: EmployeeDashboardStore,
    private employeeStore: EmployeeDashboardStore) { }

  ngOnInit(): void {
    this.employeeStore.employeeId$.subscribe(res => {
      if (!res) return;
      this.dashboardStore.getEmployeeOverview(res);

      this.employeeOverview$.subscribe(res => {
        this.employeeId = res?.id ?? 0;
        this.firstName = res?.firstName ?? '';
        this.lastName = res?.lastName ?? '';
        this.profileImgUri = res?.profileImgUri ?? '';
        this.position = res?.position ?? '';
        this.level = res?.level ?? '';
        this.address = res?.address ?? '';
        this.skills = res?.skills ?? [];
        this.certification = res?.certification ?? [];
      });
    });
  }
}
