import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { managerEvaluationLabelItems } from 'src/app/components/sum-competency-evaluation/components/competency-evaluation-form/constants/competency-evaluation-form.constant';

@Component({
  selector: 'app-performance-evaluation-form',
  templateUrl: './performance-evaluation-form.component.html',
  styleUrls: ['./performance-evaluation-form.component.scss']
})
export class PerformanceEvaluationFormComponent {
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
    this.router.navigate([`/sum-performance-evaluation/evaluation-form/${item.label}`], { queryParams: { employeeId: this.employeeId } });
  }
}
