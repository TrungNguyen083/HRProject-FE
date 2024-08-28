import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { employeeInfoLabelItems } from './constants/employee-dashboard.constant';
import { EmployeeDashboardStore } from './store/employee-dashboard-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  labelItems: MenuItem[] = employeeInfoLabelItems;
  activeItem: MenuItem = this.labelItems[0];
  evaluateCycles$ = this.employeeStore.evaluateCycles$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeStore: EmployeeDashboardStore,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.employeeStore.getEvaluateCycles();
    this.evaluateCycles$.subscribe(evaluateCycles => {
      if(!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.employeeStore.setPreviousCycle(previousCycle.id);
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.employeeStore.setCurrentCycle(currentCycle.id);
      }
    });

    const email = this.authService.getEmail();
    if (email) this.employeeStore.getEmployeeId(email);
    this.employeeStore.employeeId$.subscribe(res => {
      if(!res) return;
      this.employeeStore.setEmployeeId(res);
    })

    this.route.url.subscribe(url => {
    });
  }

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`my-dashboard/${item.label}`]);
  }
}
