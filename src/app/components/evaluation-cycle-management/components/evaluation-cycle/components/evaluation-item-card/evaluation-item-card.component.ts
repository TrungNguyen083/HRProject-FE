import { Component, Input } from '@angular/core';

@Component({
  selector: 'evaluation-item-card',
  templateUrl: './evaluation-item-card.component.html',
  styleUrls: ['./evaluation-item-card.component.scss']
})
export class EvaluationItemCardComponent {
  @Input() evaluation!: any;
}
