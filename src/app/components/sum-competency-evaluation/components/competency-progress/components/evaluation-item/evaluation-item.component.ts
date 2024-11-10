import { Component, Input } from '@angular/core';
import { ICompetencyEvaItem } from '../../models/competency-progress.model';
import { Router } from '@angular/router';

@Component({
  selector: 'competency-evaluation-item',
  templateUrl: './evaluation-item.component.html',
  styleUrls: ['./evaluation-item.component.scss']
})
export class EvaluationItemComponent {
  @Input() competencyEvaItem!: ICompetencyEvaItem;
  defaultImg = 'assets/images/profile-image-default.jpg';

  constructor(private router: Router) { }

  viewDetail(employeeId: number): void {
    this.router.navigate(['/sum-competency-evaluation/evaluation-form'], { queryParams: { employeeId } });
  }
}
