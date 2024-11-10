import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { managerEvaluationLabelItems } from './constants/competency-evaluation-form.constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-competency-evaluation-form',
  templateUrl: './competency-evaluation-form.component.html',
  styleUrls: ['./competency-evaluation-form.component.scss']
})
export class CompetencyEvaluationFormComponent {
  labelItems: MenuItem[] = managerEvaluationLabelItems;
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
    this.router.navigate([`/sum-competency-evaluation/evaluation-form/${item.label}`], { queryParams: { employeeId: this.employeeId } });
  }
}
