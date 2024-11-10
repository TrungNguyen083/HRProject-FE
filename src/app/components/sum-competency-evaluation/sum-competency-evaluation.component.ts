import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SumCompetencyEvaluationStore } from './stores/sum-competency-evaluation.store';

@Component({
  selector: 'app-sum-competency-evaluation',
  templateUrl: './sum-competency-evaluation.component.html',
  styleUrls: ['./sum-competency-evaluation.component.scss']
})
export class SumCompetencyEvaluationComponent implements OnInit {
  constructor(private sumCompetencyEvaStore: SumCompetencyEvaluationStore, private authService: AuthService) { }

  ngOnInit(): void {
    this.sumCompetencyEvaStore.getEvaluateCycles();
    this.sumCompetencyEvaStore.evaluateCycles$.subscribe(evaluateCycles => {
      if (!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.sumCompetencyEvaStore.setPreviousCycle(previousCycle.id);
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.sumCompetencyEvaStore.setCurrentCycle(currentCycle.id);
      }
    });

    const email = this.authService.getEmail();
    if (email) this.sumCompetencyEvaStore.getDepartmentId(email);
  }
}
