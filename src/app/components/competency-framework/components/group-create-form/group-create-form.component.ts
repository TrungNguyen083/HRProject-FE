import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-create-form',
  templateUrl: './group-create-form.component.html',
  styleUrls: ['./group-create-form.component.scss']
})
export class GroupCreateFormComponent {
  competencyForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.competencyForm = this.fb.group({
      groupName: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.competencyForm.valid) {
      console.log('Form Data:', this.competencyForm.value);
    }
  }
  onCancel() {
    this.competencyForm.reset();
  }
}
