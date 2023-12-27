import { Component, OnInit } from '@angular/core';
import { EmployeeDashboardStore } from '../../store/employee-dashboard-store.service';
import _ from 'lodash';

@Component({
  selector: 'employee-info-card',
  templateUrl: './employee-info-card.component.html',
  styleUrls: ['./employee-info-card.component.scss'],
})
export class EmployeeInfoCardComponent implements OnInit {
  defaultImg = 'assets/images/avatar-default.jpg';
  skills = ['Figma', 'Adobe Creative Suite', 'Adobe Illustrator'];
  interests = ['Wireframing', 'Adobe Creative Suite', 'Collaboration skills'];
  certification!: string[];
  employeeOverview$ = this.dashboardStore.employeeOverview$;

  constructor(private dashboardStore: EmployeeDashboardStore) {}

  ngOnInit(): void {
    this.dashboardStore.getEmployeeOverview(4);

    this.employeeOverview$.subscribe(res => {
      this.skills = _.map(_.slice(res?.skills, 0, 5), 'skillSetName');
      this.interests = _.map(_.slice(res?.interests, 0, 5), 'skillSetName');
      this.certification = res?.certification ?? [];
    });
  }
}
