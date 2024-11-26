import { Component } from '@angular/core';
import { evaluationOverviewLabelItems } from './constants/evaluation-form.constant';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss']
})
export class EvaluationFormComponent {
  labelItems: MenuItem[] = evaluationOverviewLabelItems;
  activeItem: MenuItem = this.labelItems[0];
  employeeId!: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParams.subscribe(queryParams => {
      this.employeeId = queryParams['employeeId'];
    })
  }

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`/hr-evaluation-overview/evaluation-form/${item.label}`], { queryParams: { employeeId: this.employeeId } });
  }
}
