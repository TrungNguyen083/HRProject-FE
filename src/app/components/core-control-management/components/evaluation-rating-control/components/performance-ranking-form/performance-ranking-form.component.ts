import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { RatingControlService } from '../../services/evaluation-rating-control.service';
import { IPerformanceRangeInput } from '../../models/evaluation-rating-control.model';

@Component({
  selector: 'app-performance-ranking-form',
  templateUrl: './performance-ranking-form.component.html',
  styleUrls: ['./performance-ranking-form.component.scss']
})
export class PerformanceRankingFormComponent implements OnInit {
  performanceRange = this.config.data?.performanceRange;
  performanceRangeForm!: FormGroup;
  isLoading = false;
  rangeValue: number[] = [0, 0.5];
  ordered!: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private ratingControlService: RatingControlService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.performanceRange) {
      this.patchFormWithPerformanceRange();
    }
  }

  initForm() {
    this.performanceRangeForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      rangeValue: ['', [Validators.required]],
      ordered: ['', [Validators.required]]
    });
  }

  patchFormWithPerformanceRange() {
    this.performanceRangeForm.patchValue({
      text: this.performanceRange.text,
      description: this.performanceRange.description,
      rangeValue: [this.performanceRange.minValue, this.performanceRange.maxValue],
      ordered: this.performanceRange.ordered
    });
    this.rangeValue = [this.performanceRange.minValue, this.performanceRange.maxValue]
    this.ordered = this.performanceRange.ordered;
  }

  onSubmit() {
    this.isLoading = true;

    const { rangeValue, ...formValues } = this.performanceRangeForm.value;

    const performanceRangeInput: IPerformanceRangeInput = {
      ...formValues,
      minValue: rangeValue[0],
      maxValue: rangeValue[1],
    };

    if (this.performanceRange) this.updatePerformanceRange(this.performanceRange.id, performanceRangeInput);
    else this.addPerformanceRange(performanceRangeInput);

    this.ref.close({ success: true });
  }

  onCloseModal() {
    this.ref.close({ success: false });
  }

  addPerformanceRange(performanceRangeInput: IPerformanceRangeInput) {
    this.ratingControlService.addPerformanceRange(performanceRangeInput)
      .pipe()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.successNotification(
            `Add performance range successfully`,
          );
        },
        error: (err) => {
          this.isLoading = false;
          this.notificationService.errorNotification(
            `Failed to add performance range`
          );
        }
      });
  }

  updatePerformanceRange(id: number, performanceRangeInput: IPerformanceRangeInput) {
    this.ratingControlService.updatePerformanceRange(id, performanceRangeInput)
      .pipe()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.successNotification(
            `Update performance range successfully`,
          );
        },
        error: (err) => {
          this.isLoading = false;
          this.notificationService.errorNotification(
            `Failed to update performance range`
          );
        }
      });
  }

}
