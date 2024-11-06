import { Component, OnInit } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { ratingControlTableCol } from '../../constants/evaluation-rating-control.constant';
import { RatingControlStore } from '../../stores/evaluation-rating-control.store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProficiencyLevelFormComponent } from '../proficiency-level-form/proficiency-level-form.component';
import { IProficiencyLevel } from '../../models/evaluation-rating-control.model';
import { ConfirmationService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { RatingControlService } from '../../services/evaluation-rating-control.service';
import { NotificationService } from 'src/app/shared/message/notification.service';

@Component({
  selector: 'proficiency-level-rating',
  templateUrl: './proficiency-level-rating.component.html',
  styleUrls: ['./proficiency-level-rating.component.scss'],
})
export class ProficiencyLevelRatingComponent implements OnInit {
  isLoading = false;
  modalRef!: DynamicDialogRef;
  table: HrmsTable<any> = {
    ...defaultTablePagination,
    data: {
      header: ratingControlTableCol,
      body: [],
    },
  };

  constructor(
    private ratingControlService: RatingControlService,
    private ratingControlStore: RatingControlStore,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.ratingControlStore.getProficiencyLevels();
    this.ratingControlStore.proficiencyLevels$.subscribe(res => {
      if (!res) return;
      this.table = {
        ...this.table,
        data: {
          header: [...this.table.data.header],
          body: res,
        },
      };
    })
  }

  onUpdateProficiencyLevel(proficiency: IProficiencyLevel) {
    this.modalRef = this.dialogService.open(ProficiencyLevelFormComponent, {
      header: 'Proficiency Level Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
      data: {
        proficiency: proficiency,
      },
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
    });
  }

  onAddProficiencyLevel() {
    this.modalRef = this.dialogService.open(ProficiencyLevelFormComponent, {
      header: 'Proficiency Level Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw'
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
    });
  }

  onDeleteProficiencyLevel(id: number) {
    this.isLoading = true;
  
    this.confirmationService.confirm({
      message: 'Are you sure to delete this proficiency level?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ratingControlService.deleteProficiencyLevel(id)
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.notificationService.successNotification('Proficiency level deleted successfully');
              this.loadTable();
            },
            error: () => {
              this.isLoading = false;
              this.notificationService.errorNotification('Failed to delete proficiency level');
            }
          });
      },
      reject: () => {
        this.isLoading = false;
      }
    });
  }
}
