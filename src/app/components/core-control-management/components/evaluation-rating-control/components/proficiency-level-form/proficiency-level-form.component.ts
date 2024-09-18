import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { IProficiencyLevelInput } from '../../models/evaluation-rating-control.model';
import { RatingControlService } from '../../services/evaluation-rating-control.service';

@Component({
  selector: 'app-proficiency-level-form',
  templateUrl: './proficiency-level-form.component.html',
  styleUrls: ['./proficiency-level-form.component.scss']
})
export class ProficiencyLevelFormComponent implements OnInit {
  proficiency = this.config.data?.proficiency;
  proficiencyLevelForm!: FormGroup;
  isLoading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private ratingControlService: RatingControlService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.proficiency) {
      this.patchFormWithProficiency();
    }
  }

  initForm() {
    this.proficiencyLevelForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      score: ['', [Validators.required]],
    });
  }

  patchFormWithProficiency() {
    this.proficiencyLevelForm.patchValue({
      name: this.proficiency.proficiencyLevelName,
      description: this.proficiency.proficiencyLevelDescription,
      score: this.proficiency.score
    });
  }

  onSubmit() {
    this.isLoading = true;

    const proficiencyLevelInput: IProficiencyLevelInput = {
      ...this.proficiencyLevelForm.value,
    };

    if(this.proficiency) this.updateProficiencyLevel(this.proficiency.id, proficiencyLevelInput);
    else this.addProficiencyLevel(proficiencyLevelInput);

    this.ref.close({ success: true });
  }

  onCloseModal() {
    this.ref.close({ success: false });
  }

  addProficiencyLevel(proficiencyLevelInput: IProficiencyLevelInput) {
    this.ratingControlService.addProficiencyLevel(proficiencyLevelInput)
    .pipe()
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.successNotification(
          `Add proficiency level successfully`,
        );
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.errorNotification(
          `Failed to add proficiency level`
        );
      }
    });
  }

  updateProficiencyLevel(id: number, proficiencyLevelInput: IProficiencyLevelInput) {
    this.ratingControlService.updateProficiencyLevel(id, proficiencyLevelInput)
    .pipe()
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.successNotification(
          `Update proficiency level successfully`,
        );
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.errorNotification(
          `Failed to update proficiency level`
        );
      }
    });
  }
}
