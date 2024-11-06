import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { performanceEvaluationLabelItems } from './constants/performance-evaluation.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PerformanceEvaluationStore } from './stores/performance-evaluation.store';

@Component({
  selector: 'app-performance-evaluation',
  templateUrl: './performance-evaluation.component.html',
  styleUrls: ['./performance-evaluation.component.scss']
})
export class PerformanceEvaluationComponent implements OnInit {
  labelItems: MenuItem[] = performanceEvaluationLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  constructor(
    private router: Router,
    private authService: AuthService,
    private performanceEvaluationStore: PerformanceEvaluationStore
  ) { }

  ngOnInit(): void {
    this.performanceEvaluationStore.getEvaluateCycles();
    this.performanceEvaluationStore.evaluateCycles$.subscribe(evaluateCycles => {
      if (!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.performanceEvaluationStore.setPreviousCycle(previousCycle.id);
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.performanceEvaluationStore.setCurrentCycle(currentCycle.id);
      }
    });

    const email = this.authService.getEmail();
    if (email) this.performanceEvaluationStore.getEmployeeId(email);
    this.performanceEvaluationStore.employeeId$.subscribe(res => {
      if (!res) return;
      this.performanceEvaluationStore.setEmployeeId(res);
    });
  }

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`performance-evaluation/${item.label}`]);
  }
}
