import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-competency-create-form',
  templateUrl: './competency-create-form.component.html',
  styleUrls: ['./competency-create-form.component.scss']
})
export class CompetencyCreateFormComponent {
  competencyForm: FormGroup;
  groups = ['Group 1', 'Group 2', 'Group 3'];
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.competencyForm = this.fb.group({
      groupName: ['', Validators.required],
      competencyName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)]
    });
  }



  onSubmit(): void {
    if (this.competencyForm.valid) {
      this.isLoading = true;
      console.log(this.competencyForm.value);
      this.isLoading = false;
    }
  }

  onCancel(): void {
    console.log('Form canceled');
  }
}
