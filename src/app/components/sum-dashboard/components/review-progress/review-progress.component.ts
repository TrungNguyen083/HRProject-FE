import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { reviewProgressLabelItems } from './constants/review-progree.constant';

@Component({
  selector: 'review-progress',
  templateUrl: './review-progress.component.html',
  styleUrls: ['./review-progress.component.scss']
})
export class ReviewProgressComponent {
  labelItems: MenuItem[] = reviewProgressLabelItems;
  activeItem: MenuItem = this.labelItems[0];

  onActiveItemChange(item: MenuItem): void {
    this.activeItem = item;
  }
}
