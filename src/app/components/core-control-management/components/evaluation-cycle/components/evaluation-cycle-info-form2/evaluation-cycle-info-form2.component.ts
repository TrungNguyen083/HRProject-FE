import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { IEvaluateCycleInput } from '../../models/evaluation-cycle.model';
import { EvaluateCycleOverallService } from '../../services/evaluation-cycle.service';

@Component({
  selector: 'app-evaluation-cycle-info-form2',
  templateUrl: './evaluation-cycle-info-form2.component.html',
  styleUrls: ['./evaluation-cycle-info-form2.component.scss']
})
export class EvaluationCycleInfoForm2Component implements OnInit {
  addCycleForm2!: FormGroup;
  isLoading = false;
  evaluationCycleInput!: IEvaluateCycleInput;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private evaluationCycleService: EvaluateCycleOverallService
  ) { }

  get timeLines() {
    return this.addCycleForm2.get('timeLines') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.evaluationCycleInput = params as IEvaluateCycleInput;
      if (this.evaluationCycleInput) {
        this.addCycleForm2.patchValue(this.evaluationCycleInput);
      }
    });
  }

  initForm() {
    this.addCycleForm2 = this.fb.group({
      timeLines: this.fb.array([
        this.fb.group({
          timeLineName: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
        })
      ])
    });
  }

  addTimeLine() {
    const newTimeLine = this.fb.group({
      timeLineName: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.timeLines.push(newTimeLine);
  }

  removeTimeLine(index: number) {
    this.timeLines.removeAt(index);
  }

  createCycle() {
    this.isLoading = true;

    this.evaluationCycleInput = {
      ...this.evaluationCycleInput,
      ...this.addCycleForm2.value
    }

    this.evaluationCycleService.addEvaluationCycle(this.evaluationCycleInput)
      .pipe()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.successNotification(
            `Create evaluation cycle successfully`,
          );

          this.router.navigate(['/core-control-management/evaluation-cycle']);
        },
        error: (err) => {
          this.isLoading = false;
          this.notificationService.errorNotification(
            `Failed to create evaluation cycle: ${err.message}`
          );
        }
      });
  }

  confirmCancel() {
    console.log('This confirm');
    this.confirmationService.confirm({
      message: 'Are you sure to cancel this process?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/core-control-management/evaluation-cycle']);
      }
    });
  }
}
