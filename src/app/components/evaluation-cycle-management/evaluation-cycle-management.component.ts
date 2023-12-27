import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { evaluationCycleLabelItems } from './constants/evaluation-cycle-management.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-cycle-management',
  templateUrl: './evaluation-cycle-management.component.html',
  styleUrls: ['./evaluation-cycle-management.component.scss']
})
export class EvaluationCycleManagementComponent {
  labelItems: MenuItem[] = evaluationCycleLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  constructor(private router: Router){}

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`evaluation-cycle-management/${item.label}`]);
  }
}
