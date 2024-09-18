import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { IEvaluateCycleInput } from '../../models/evaluation-cycle.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-evaluation-cycle-info-form',
  templateUrl: './evaluation-cycle-info-form.component.html',
  styleUrls: ['./evaluation-cycle-info-form.component.scss']
})
export class EvaluationCycleInfoFormComponent implements OnInit {
  addCycleForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addCycleForm = this.fb.group({
      cycleName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      initialDate: ['', Validators.required],
    });
  }

  onNext(): void {
    const evaluationCycleInput: IEvaluateCycleInput = {
      ...this.addCycleForm.value,
      startDate: this.datePipe.transform(this.addCycleForm.value.startDate, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(this.addCycleForm.value.endDate, 'yyyy-MM-dd'),
      initialDate: this.datePipe.transform(this.addCycleForm.value.initialDate, 'yyyy-MM-dd')
    }

    this.router.navigate(['/core-control-management/evaluation-cycle/create-cycle-step2'], { 
      queryParams: evaluationCycleInput 
    });
  }

  confirmCancel() {
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
