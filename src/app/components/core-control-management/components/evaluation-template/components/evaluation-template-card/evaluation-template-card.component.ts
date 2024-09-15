import { Component, Input } from '@angular/core';
import { ITemplate } from '../../models/evaluation-template.model';

@Component({
  selector: 'evaluation-template-card',
  templateUrl: './evaluation-template-card.component.html',
  styleUrls: ['./evaluation-template-card.component.scss']
})
export class EvaluationTemplateCardComponent {
  @Input() template!: ITemplate;
}
