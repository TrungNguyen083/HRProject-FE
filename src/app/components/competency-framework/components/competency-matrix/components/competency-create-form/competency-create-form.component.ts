import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDropdownItem } from 'src/app/models/global.model';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { CompetencyMatrixService } from '../../services/competency-matrix.service';
import { ICompetencyInput } from '../../models/competency-matrix.model';
import { CompetencyMatrixStore } from '../../stores/competency-matrix.store';

@Component({
  selector: 'app-competency-create-form',
  templateUrl: './competency-create-form.component.html',
  styleUrls: ['./competency-create-form.component.scss']
})
export class CompetencyCreateFormComponent implements OnInit {
  competency = this.config.data?.competency;
  competencyForm!: FormGroup;
  groupOptions!: IDropdownItem[];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private notificationService: NotificationService,
    private ref: DynamicDialogRef,
    private competencyMatrixService: CompetencyMatrixService,
    private competencyMatrixStore: CompetencyMatrixStore,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    if (this.competency) {
      this.patchFormWithCompetency();
    }
    this.getGroups();
  }

  initForm() {
    this.competencyForm = this.fb.group({
      competencyGroupId: ['', Validators.required],
      competencyName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(2000)]
    });
  }

  getGroups() {
    this.competencyMatrixStore.getCompetencyGroups();
    this.competencyMatrixStore.competencyGroups$.subscribe(res => {
      if (!res) return;
      this.groupOptions = res.map(group => {
        return {
          label: group.competencyGroupName,
          value: group.id,
        };
      });
    })
  }

  patchFormWithCompetency() {
    this.competencyForm.patchValue({
      competencyGroupId: this.competency.competencyGroup.id,
      competencyName: this.competency.competencyName,
      description: this.competency.description,
    })
  }

  onSubmit(): void {
    this.isLoading = true;

    const competencyInput: ICompetencyInput = {
      ...this.competencyForm.value,
    };

    console.log("Competency Input", competencyInput);

    if (this.competency) this.updateCompetency(this.competency.id, competencyInput);
    else this.addCompetency(competencyInput);

    this.ref.close({ success: true });
  }

  addCompetency(competencyInput: ICompetencyInput) {
    this.competencyMatrixService.createCompetency(competencyInput)
      .pipe()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.successNotification(
            `Add competency successfully`,
          );
        },
        error: (err) => {
          this.isLoading = false;
          this.notificationService.errorNotification(
            `Failed to add competency`
          );
        }
      });
  }

  updateCompetency(id: number, competencyInput: ICompetencyInput) {
    this.competencyMatrixService.updateCompetency(id, competencyInput)
      .pipe()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.successNotification(
            `Update competency successfully`,
          );
        },
        error: (err) => {
          this.isLoading = false;
          this.notificationService.errorNotification(
            `Failed to update competency`
          );
        }
      });
  }

  onCloseModal() {
    this.ref.close({ success: false });
  }
}
