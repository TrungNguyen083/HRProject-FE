import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

import { MenuItem } from './models/menu.model';
import { LayoutService } from './services/app.layout.service';

const dummies: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: 'fa-solid fa-chart-pie',
    path: 'dashboard',
  },
  {
    name: 'Employee Management',
    icon: 'pi pi-users',
    path: 'employee-management',
  },
  {
    name: 'Evaluation Overview',
    icon: 'pi pi-chart-pie',
    path: 'hr-evaluation-overview',
  },
  {
    name: 'Competency Framework',
    icon: 'pi pi-chart-pie',
    path: 'competency-framework',
  },
  // {
  //   name: 'Performance Framework',
  //   icon: 'fa-solid fa-gauge-high',
  //   path: 'performance-framework',
  // },
  {
    name: 'Core Control Management',
    icon: 'fa-solid fa-clock-rotate-left',
    path: 'core-control-management'
  }
];

@Component({
  selector: 'app-sidebar-hr',
  templateUrl: './app-sidebar-hr.component.html',
  styles: [
    `
      .active {
        @apply font-semibold opacity-100  border-secondary md:border-b-0 text-primary;
      }
      .active div {
        @apply visible flex opacity-100 pointer-events-auto;
      }
      .active.submenu {
        @apply flex;
      }
      /* For Webkit-based browsers (Chrome, Safari and Opera) */
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      /* For IE, Edge and Firefox */
      .scrollbar-hide {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    `,
  ],
})
export class AppSidebarHrComponent implements OnInit {
  isNavbarOn!: boolean;
  menuElements: MenuItem[] = dummies;
  private readonly destroy$ = new Subject();

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.getNavbarState();
  }
  getNavbarState(): void {
    this.layoutService.currentNavbarState
      .pipe(
        tap(state => (this.isNavbarOn = state)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
