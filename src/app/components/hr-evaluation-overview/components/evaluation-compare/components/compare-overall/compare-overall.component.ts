import { Component, OnInit } from '@angular/core';
import { ICompareOverall, ICompareParams } from '../../models/evaluation-compare.model';
import { EvaluationCompareStore } from '../../stores/evaluation-compare.store';
import { combineLatest } from 'rxjs';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';

@Component({
  selector: 'compare-overall',
  templateUrl: './compare-overall.component.html',
  styleUrls: ['./compare-overall.component.scss']
})
export class CompareOverallComponent implements OnInit {
  compareOveralls!: ICompareOverall[];
  params!: ICompareParams;

  constructor(
    private evaluationCompareStore: EvaluationCompareStore,
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    combineLatest([
      this.evaluationCompareStore.employeeIds$,
      this.hrEvaluationOverviewStore.currentCycle$,
    ]).subscribe(([employeeIds, cycleId]) => {
      if (!employeeIds || !cycleId) return;

      this.params = { ...this.params, employeeIds, cycleId };
      this.evaluationCompareStore.getCompareOverviews(this.params);
    })

    this.evaluationCompareStore.compareOverviews$.subscribe(res => {
      if (!res) return;
      this.compareOveralls = res;
    })
  }
}
