import { Component, Input } from '@angular/core';
import { IPromotion } from '../../models/evaluation-promotion.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PromotionFormComponent } from '../promotion-form/promotion-form.component';

@Component({
  selector: 'promotion-item',
  templateUrl: './promotion-item.component.html',
  styleUrls: ['./promotion-item.component.scss']
})
export class PromotionItemComponent {
  @Input() promotion!: IPromotion;
  modalRef!: DynamicDialogRef;
  defaultImg = 'assets/images/profile-image-default.jpg';

  constructor(
    public dialogService: DialogService,
  ) { }

  openModel(employeeId: number): void {
    this.modalRef = this.dialogService.open(PromotionFormComponent, {
      header: 'Update Promotion',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
      data: {
        employeeId,
      },
    });

    this.modalRef.onClose.subscribe(({ success }) => {
      if (!success) return;
      window.location.reload();
    });
  }
}
