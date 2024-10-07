import { Component, OnInit } from '@angular/core';
import { IReviewStatus, ICycleDepartmentParams } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { SumDashboardStore } from 'src/app/components/sum-dashboard/stores/sum-dashboard.store';


@Component({
  selector: 'performance-review-status',
  templateUrl: './performance-review-status.component.html',
  styleUrls: ['./performance-review-status.component.scss']
})
export class PerformanceReviewStatusComponent implements OnInit {
  esReviewStatus!: IReviewStatus[];
  params!: ICycleDepartmentParams;

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.sumDashboardStore.departmentId$.subscribe(departmentId => {
        if (!departmentId) return;
        this.params = { cycleId, departmentId }
        this.sumDashboardStore.getPerformanceReviewStatus(this.params);
      })
    })

    this.sumDashboardStore.performanceReviewStatus$.subscribe(res => {
      this.esReviewStatus = res;
    })
  }
}
