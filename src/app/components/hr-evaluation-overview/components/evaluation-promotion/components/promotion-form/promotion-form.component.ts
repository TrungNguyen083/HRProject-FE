import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EvaluationPromotionService } from '../../services/evaluation-promotion.service';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';
import { NotificationService } from 'src/app/shared/message/notification.service';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
})
export class PromotionFormComponent implements OnInit {
  employeeId = this.config.data.employeeId;
  promotionForm!: FormGroup;
  cycleId!: number
  isLoading = false;
  isApproves = [
    {
      label: 'Approve',
      value: true,
    },
    {
      label: 'Reject',
      value: false,
    },
  ];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private evaluationPromotionService: EvaluationPromotionService,
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore,
    private notificationService: NotificationService,
  ) { this.initForm() }

  ngOnInit(): void {
    this.hrEvaluationOverviewStore.currentCycle$.subscribe(cycleId => {
      if (!cycleId) return
      this.cycleId = cycleId;
    })
  }

  initForm() {
    this.promotionForm = this.fb.group({
      isApprove: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  onPromotion() {
    const { isApprove, comment } = this.promotionForm.value;

    this.cycleId
    this.evaluationPromotionService.updatePromotionRequest(this.employeeId, this.cycleId, isApprove, comment)
    .pipe(o$ => {
      this.isLoading = true;
      return o$;
    })
    .subscribe(() => {
      this.isLoading = false;
      this.notificationService.successNotification(
        $localize`Update promotion successfully`,
      );
      this.ref.close({success: true});
    });
  }
}
