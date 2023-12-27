import { Component, Input } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';

@Component({
  selector: 'app-evaluation-rating-control-item',
  templateUrl: './evaluation-rating-control-item.component.html',
  styleUrls: ['./evaluation-rating-control-item.component.scss']
})
export class EvaluationRatingControlItemComponent {
  @Input() title!: string;
  @Input() table!: HrmsTable<any>;
}
