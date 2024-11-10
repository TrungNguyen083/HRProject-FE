import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SumPerformanceEvaluationStore } from './stores/sum-performance-evaluation.store';

@Component({
  selector: 'app-sum-performance-evaluation',
  templateUrl: './sum-performance-evaluation.component.html',
  styleUrls: ['./sum-performance-evaluation.component.scss']
})
export class SumPerformanceEvaluationComponent implements OnInit {
  constructor(private sumPerformanceEvaStore: SumPerformanceEvaluationStore, private authService: AuthService) { }

  ngOnInit(): void {
    this.sumPerformanceEvaStore.getEvaluateCycles();
    this.sumPerformanceEvaStore.evaluateCycles$.subscribe(evaluateCycles => {
      if (!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.sumPerformanceEvaStore.setPreviousCycle(previousCycle.id);
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.sumPerformanceEvaStore.setCurrentCycle(currentCycle.id);
      }
    });

    const email = this.authService.getEmail();
    if (email) this.sumPerformanceEvaStore.getDepartmentId(email);
  }
}
