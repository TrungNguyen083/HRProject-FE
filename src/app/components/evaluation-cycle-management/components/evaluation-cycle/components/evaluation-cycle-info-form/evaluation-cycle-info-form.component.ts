import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-cycle-info-form',
  templateUrl: './evaluation-cycle-info-form.component.html',
  styleUrls: ['./evaluation-cycle-info-form.component.scss']
})
export class EvaluationCycleInfoFormComponent {

  constructor(private router: Router) {}

  onNext(): void {
    this.router.navigate(['/evaluation-cycle-management/evaluation-cycle/create-cycle-step2']);
  }

}
