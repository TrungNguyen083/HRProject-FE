import { Component, OnInit } from '@angular/core';
import { SumDashboardStore } from './stores/sum-dashboard.store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sum-dashboard',
  templateUrl: './sum-dashboard.component.html',
  styleUrls: ['./sum-dashboard.component.scss']
})
export class SumDashboardComponent implements OnInit {
  constructor(private sumDashboardStore: SumDashboardStore, private authService: AuthService) { }

  ngOnInit(): void {
    this.sumDashboardStore.getEvaluateCycles();
    this.sumDashboardStore.evaluateCycles$.subscribe(evaluateCycles => {
      if (!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.sumDashboardStore.setPreviousCycle(previousCycle.id);
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.sumDashboardStore.setCurrentCycle(currentCycle.id);
      }
    });

    const email = this.authService.getEmail();
    if (email) this.sumDashboardStore.getDepartmentId(email);
  }
}
