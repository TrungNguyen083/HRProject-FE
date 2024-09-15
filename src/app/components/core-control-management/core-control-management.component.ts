import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { coreControlLabelItems } from './constants/core-control-management.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'core-control-management',
  templateUrl: './core-control-management.component.html',
  styleUrls: ['./core-control-management.component.scss']
})
export class CoreControlManagementComponent {
  labelItems: MenuItem[] = coreControlLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  constructor(private router: Router){}

  onActiveItemChange(item: MenuItem): void {
    this.router.navigate([`core-rating-management/${item.label}`]);
  }
}
