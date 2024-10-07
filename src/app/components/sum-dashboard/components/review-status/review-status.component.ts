import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { reviewStatusLabelItems } from './constants/review-status.constant';

@Component({
  selector: 'review-status',
  templateUrl: './review-status.component.html',
  styleUrls: ['./review-status.component.scss']
})
export class ReviewStatusComponent {
  labelItems: MenuItem[] = reviewStatusLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  onActiveItemChange(item: MenuItem): void {
    this.activeItem = item;
  }
}
