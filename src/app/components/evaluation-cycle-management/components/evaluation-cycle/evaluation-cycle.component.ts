import { Component } from '@angular/core';

const cycleStatusOptions = [
  {
    label: 'On track',
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
    status: 'On Track',
    period: '01/07/2023 - 31/07/2023',
    type: 'Competencies evaluation',
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
    type: 'Performance evaluation',
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
    type: 'Performance evaluation',
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
export class EvaluationCycleComponent {
  cycleStatusOptions = cycleStatusOptions;
  evaluations = evaluations;
}
