import { Component, OnInit } from '@angular/core';
import { ICycleOverall } from '../../models/evaluation-cycle.model';
import { CycleOverallStore } from '../../stores/evaluation-cycle.store';

const cycleStatusOptions = [
  {
    label: 'In Progress',
    value: 1,
  },
  {
    label: 'Completed',
    value: 2,
  },
];

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit {

  cycleStatusOptions = cycleStatusOptions;
  cyclesOverall!: ICycleOverall[];

  constructor(private cycleOverallStore: CycleOverallStore) { }

  ngOnInit(): void {
    this.cycleOverallStore.getCyclesOverall();
    this.cycleOverallStore.cyclesOverall$.subscribe(res => {
      if (!res) return;
      this.cyclesOverall = res;
    })
  }

}
