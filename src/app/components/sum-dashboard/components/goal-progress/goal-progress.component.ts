import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { defaultImg } from 'src/app/constants/app.constant';
import { SumDashboardStore } from '../../stores/sum-dashboard.store';
import { ICycleDepartmentParams, IGoalProgress } from '../../models/sum-dashboard.model';






@Component({
  selector: 'goal-progress',
  templateUrl: './goal-progress.component.html',
  styleUrls: ['./goal-progress.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class GoalProgressComponent implements OnInit {
  eGoals!: IGoalProgress[];
  defaultImg = defaultImg;
  params!: ICycleDepartmentParams;

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
    this.sumDashboardStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return;
      this.params = { ...this.params, cycleId };
    })

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.params = { ...this.params, departmentId };

      this.sumDashboardStore.getDepartmentGoalProgress(this.params);
    })

    this.sumDashboardStore.departmentGoalProgress$.subscribe(res => {
      if (!res) return;
      this.eGoals = res;
    })
  }
}
