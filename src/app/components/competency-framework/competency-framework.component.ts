import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { competencyFrameworkLabelItems } from './constants/competency-framework.constant';

@Component({
  selector: 'app-competency-framework',
  templateUrl: './competency-framework.component.html',
  styleUrls: ['./competency-framework.component.scss']
})
export class CompetencyFrameworkComponent {
  labelItems: MenuItem[] = competencyFrameworkLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  constructor(private router: Router){}

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`competency-framework/${item.label}`]);
  }
}
