import { Component, Input } from '@angular/core';
import { IPerformanceEvaItem } from '../../models/performance-progress.model';
import { Router } from '@angular/router';

@Component({
  selector: 'performance-evaluation-item',
  templateUrl: './evaluation-item.component.html',
  styleUrls: ['./evaluation-item.component.scss']
})
export class EvaluationItemComponent {
  @Input() performanceEvaItem!: IPerformanceEvaItem;
  defaultImg = 'assets/images/profile-image-default.jpg';

  constructor(private router: Router) { }

  viewDetail(employeeId: number): void {
    this.router.navigate(['/sum-performance-evaluation/evaluation-form'], { queryParams: { employeeId } });
  }
}
