import { Component, OnInit } from '@angular/core';
import { ICycleDepartmentParams, IReviewStatus } from 'src/app/components/sum-dashboard/models/sum-dashboard.model';
import { SumDashboardStore } from 'src/app/components/sum-dashboard/stores/sum-dashboard.store';


@Component({
  selector: 'competency-review-status',
  templateUrl: './competency-review-status.component.html',
  styleUrls: ['./competency-review-status.component.scss']
})
export class CompetencyReviewStatusComponent implements OnInit {
  esReviewStatus!: IReviewStatus[];
  params!: ICycleDepartmentParams;

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.sumDashboardStore.departmentId$.subscribe(departmentId => {
        if (!departmentId) return;
        this.params = { cycleId, departmentId }
        this.sumDashboardStore.getCompetencyReviewStatus(this.params);
      })
    })

    this.sumDashboardStore.competencyReviewStatus$.subscribe(res => {
      this.esReviewStatus = res;
    })
  }
}
