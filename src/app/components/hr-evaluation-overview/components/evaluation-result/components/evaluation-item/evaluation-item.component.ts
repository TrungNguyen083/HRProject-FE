import { Component, Input, OnInit } from '@angular/core';
import { IEvaluationResult } from '../../models/evaluation-result.model';
import { Router } from '@angular/router';
import { EvaluationResultStore } from '../../stores/evaluation-result.store';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'evaluation-item',
  templateUrl: './evaluation-item.component.html',
  styleUrls: ['./evaluation-item.component.scss']
})
export class EvaluationItemComponent implements OnInit {
  @Input() evaluationResult!: IEvaluationResult;
  defaultImg = 'assets/images/profile-image-default.jpg';
  checked = false;
  selectedEvaIds$ = this.evaluationResultStore.selectedEvaIds$;

  constructor(
    private router: Router,
    private evaluationResultStore: EvaluationResultStore
  ) { }

  viewDetail(employeeId: number): void {
    this.router.navigate(['/hr-evaluation-overview/evaluation-form'], { queryParams: { employeeId } });
  }

  ngOnInit(): void {
    this.evaluationResultStore.selectedEvaIds$.subscribe(evaIds => {
      this.checked = evaIds.includes(this.evaluationResult.employeeId);
    });
  }

  onCheckChange(e: CheckboxChangeEvent) {
    const { checked } = e;
    if (checked) {
      this.evaluationResultStore.addEval(this.evaluationResult.employeeId);
    } else {
      this.evaluationResultStore.removeEva(this.evaluationResult.employeeId);
    }
  }
}
