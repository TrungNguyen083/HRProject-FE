import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluationCompareStore } from './stores/evaluation-compare.store';

@Component({
  selector: 'app-evaluation-compare',
  templateUrl: './evaluation-compare.component.html',
  styleUrls: ['./evaluation-compare.component.scss']
})
export class EvaluationCompareComponent implements OnInit {
  employeeIds: number[] = [];

  constructor(
    private router: Router,
    private evaluationCompareStore: EvaluationCompareStore,
  ) { }

  ngOnInit(): void {
    const navigation = history.state;
    if (navigation && navigation.employeeIds) {
      this.employeeIds = navigation.employeeIds;
      this.evaluationCompareStore.setEmployeeIds(this.employeeIds);
    }
  }

  onBack() {
    this.router.navigate(['/hr-evaluation-overview/evaluation-result']);
  }
}
