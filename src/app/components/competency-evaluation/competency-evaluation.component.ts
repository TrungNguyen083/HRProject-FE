import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { competencyEvaluationLabelItems } from './constants/competency-evaluation.constant';
import { CompetencyEvaluationStore } from './stores/competency-evaluation.store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-competency-evaluation',
  templateUrl: './competency-evaluation.component.html',
  styleUrls: ['./competency-evaluation.component.scss']
})
export class CompetencyEvaluationComponent implements OnInit {
  labelItems: MenuItem[] = competencyEvaluationLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  constructor(
    private router: Router,
    private authService: AuthService,
    private competencyEvaluationStore: CompetencyEvaluationStore
  ) { }

  ngOnInit(): void {
    this.competencyEvaluationStore.getEvaluateCycles();
    this.competencyEvaluationStore.evaluateCycles$.subscribe(evaluateCycles => {
      if (!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.competencyEvaluationStore.setPreviousCycle(previousCycle.id);
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.competencyEvaluationStore.setCurrentCycle(currentCycle.id);
      }
    });

    const email = this.authService.getEmail();
    if (email) this.competencyEvaluationStore.getEmployeeId(email);
    this.competencyEvaluationStore.employeeId$.subscribe(res => {
      if (!res) return;
      this.competencyEvaluationStore.setEmployeeId(res);
    });
  }

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`competency-evaluation/${item.label}`]);
  }
}
