import { Component, OnInit } from '@angular/core';
import { HrEvaluationOverviewStore } from './stores/hr-evaluation-overview.store';
import { MenuItem } from 'primeng/api';
import { hrEvaluationOverviewLabelItems } from './constants/hr-evaluation-overview.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-evaluation-overview',
  templateUrl: './hr-evaluation-overview.component.html',
  styleUrls: ['./hr-evaluation-overview.component.scss']
})
export class HrEvaluationOverviewComponent implements OnInit {
  labelItems: MenuItem[] = hrEvaluationOverviewLabelItems;
  activeItem: MenuItem = this.labelItems[0];
  employeeId!: number
  showTabMenu: boolean = true;

  constructor(private hrEvaluationOverview: HrEvaluationOverviewStore, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showTabMenu = !currentRoute.includes('evaluation-compare');
      this.showTabMenu = !currentRoute.includes('evaluation-form');
    });

    this.hrEvaluationOverview.getEvaluateCycles();
    this.hrEvaluationOverview.evaluateCycles$.subscribe(evaluateCycles => {
      if (!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.hrEvaluationOverview.setPreviousCycle(previousCycle.id);
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.hrEvaluationOverview.setCurrentCycle(currentCycle.id);
      }
    });
  }

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`/hr-evaluation-overview/${item.label}`], { queryParams: { employeeId: this.employeeId } });
  }
}
