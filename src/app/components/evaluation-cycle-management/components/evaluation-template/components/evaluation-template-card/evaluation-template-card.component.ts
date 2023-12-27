import { Component, Input } from '@angular/core';

const template = {
  id: 1,
  name: 'Annual Review Form',
  createdAt: '20/07/2023 18:00',
  createdBy: 'Jake L'
}
@Component({
  selector: 'evaluation-template-card',
  templateUrl: './evaluation-template-card.component.html',
  styleUrls: ['./evaluation-template-card.component.scss']
})
export class EvaluationTemplateCardComponent {
  @Input() template = template;
}
