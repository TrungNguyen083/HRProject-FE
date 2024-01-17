import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { employeeInfoLabelItems } from './constants/employee-dashboard.constant';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  labelItems: MenuItem[] = employeeInfoLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
    });
  }

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`my-dashboard/${item.label}`]);
  }
}
