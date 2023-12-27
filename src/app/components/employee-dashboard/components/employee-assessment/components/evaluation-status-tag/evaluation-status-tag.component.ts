import { Component, Input } from '@angular/core';
import { EvaluationStatus } from '../../models/employee-assessment.model';

@Component({
  selector: 'evaluation-status-tag',
  templateUrl: './evaluation-status-tag.component.html',
  styleUrls: ['./evaluation-status-tag.component.scss'],
})
export class EvaluationStatusTagComponent {
  @Input() status!: number;
  evaluationStatus = EvaluationStatus;
}
