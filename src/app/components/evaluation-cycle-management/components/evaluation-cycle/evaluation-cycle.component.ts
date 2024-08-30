import { Component, OnInit } from '@angular/core';
import { CycleOverallStore } from './stores/evaluation-cycle.store';
import { ICycleOverall } from './models/evaluation-cycle.model';

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
const evaluations = [
  {
    name: 'Review Cycle H1/2023',
    status: 'In Progress',
    period: '01/07/2023 - 31/07/2023',
    completionStatus: {
      completed: 0,
      selfReview: 20,
      managerReview: 20
    }
  },
  {
    name: 'Review Cycle H1/2023',
    status: 'Completed',
    period: '01/07/2023 - 31/07/2023',
    completionStatus: {
      completed: 100,
      selfReview: 100,
      managerReview: 100
    },
  },
  {
    name: 'Review Cycle H1/2023',
    status: 'Completed',
    period: '01/07/2023 - 31/07/2023',
    completionStatus: {
      completed: 100,
      selfReview: 100,
      managerReview: 100
    },
  },
];
@Component({
  selector: 'app-evaluation-cycle',
  templateUrl: './evaluation-cycle.component.html',
  styleUrls: ['./evaluation-cycle.component.scss'],
})
export class EvaluationCycleComponent implements OnInit {
  
  cycleStatusOptions = cycleStatusOptions;
  cyclesOverall!: ICycleOverall[];

  constructor(private cycleOverallStore: CycleOverallStore) {}

  ngOnInit(): void {
    this.cycleOverallStore.getCyclesOverall();
    this.cycleOverallStore.cyclesOverall$.subscribe(res => {
      if (!res) return;
      this.cyclesOverall = res;
    })
  }
}
