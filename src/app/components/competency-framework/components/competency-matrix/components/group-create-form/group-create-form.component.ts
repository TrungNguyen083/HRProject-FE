import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { ICompetencyGroupInput } from '../../models/competency-matrix.model';
import { CompetencyMatrixService } from '../../services/competency-matrix.service';

@Component({
  selector: 'app-group-create-form',
  templateUrl: './group-create-form.component.html',
  styleUrls: ['./group-create-form.component.scss']
})
export class GroupCreateFormComponent implements OnInit {
  group = this.config.data?.group;
  groupForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private notificationService: NotificationService,
    private ref: DynamicDialogRef,
    private competencyMatrixService: CompetencyMatrixService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.group) {
      this.patchFormWithGroup();
    }
  }

  initForm() {
    this.groupForm = this.fb.group({
      competencyGroupName: ['', Validators.required],
      description: [''],
    });
  }

  patchFormWithGroup() {
    this.groupForm.patchValue({
      competencyGroupName: this.group.competencyGroupName,
      description: this.group.description,
    })
  }

  onSubmit() {
    this.isLoading = true;

    const competencyGroupInput: ICompetencyGroupInput = {
      ...this.groupForm.value,
    };

    if(this.group) this.updateCompetencyGroup(this.group.id, competencyGroupInput);
    else this.addCompetencyGroup(competencyGroupInput);

    this.ref.close({ success: true });
  }

  addCompetencyGroup(competencyGroupInput: ICompetencyGroupInput) {
    this.competencyMatrixService.createCompetencyGroup(competencyGroupInput)
    .pipe()
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.successNotification(
          `Add competency group successfully`,
        );
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.errorNotification(
          `Failed to add competency group`
        );
      }
    });
  }

  updateCompetencyGroup(id: number, competencyGroupInput: ICompetencyGroupInput) {
    this.competencyMatrixService.updateCompetencyGroup(id, competencyGroupInput)
    .pipe()
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.successNotification(
          `Update competency group successfully`,
        );
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.errorNotification(
          `Failed to update competency group`
        );
      }
    });
  }

  onCloseModal() {
    this.ref.close({ success: false });
  }
}
