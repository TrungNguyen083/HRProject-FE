import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownItem } from 'src/app/models/global.model';

const groups = [
  {
    id: 1,
    groupName: "Group 1"
  },
  {
    id: 2,
    groupName: "Group 2"
  },
  {
    id: 3,
    groupName: "Group 3"
  }
]

@Component({
  selector: 'app-competency-create-form',
  templateUrl: './competency-create-form.component.html',
  styleUrls: ['./competency-create-form.component.scss']
})
export class CompetencyCreateFormComponent implements OnInit {
  competencyForm: FormGroup;
  groupOptions!: IDropdownItem[];
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.competencyForm = this.fb.group({
      groupSelect: ['', Validators.required],
      competencyName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(2000)]
    });
  }

  ngOnInit(): void {
    this.groupOptions = groups.map(group => {
      return {
        label: group.groupName,
        value: group.id,
      };
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
