import { Component, OnInit } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { ratingControlTableCol } from '../../constants/evaluation-rating-control.constant';
import { RatingControlStore } from '../../stores/evaluation-rating-control.store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPerformanceRange } from '../../models/evaluation-rating-control.model';
import { PerformanceRankingFormComponent } from '../performance-ranking-form/performance-ranking-form.component';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { RatingControlService } from '../../services/evaluation-rating-control.service';

@Component({
  selector: 'performance-ranking-rating',
  templateUrl: './performance-ranking-rating.component.html',
  styleUrls: ['./performance-ranking-rating.component.scss']
})
export class PerformanceRankingRatingComponent implements OnInit {
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
    this.ratingControlStore.getPerformanceRanges();
    this.ratingControlStore.performanceRanges$.subscribe(res => {
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

  onUpdatePerformanceRange(performanceRange: IPerformanceRange) {
    this.modalRef = this.dialogService.open(PerformanceRankingFormComponent, {
      header: 'Performance Range Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
      data: {
        performanceRange: performanceRange,
      },
    });

    this.modalRef.onClose.subscribe((result) => {
      if (!result || !result.success) return;
      window.location.reload();
    });
  }

  onAddPerformanceRange() {
    this.modalRef = this.dialogService.open(PerformanceRankingFormComponent, {
      header: 'Performance Range Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw'
    });

    this.modalRef.onClose.subscribe((result) => {
      if (!result || !result.success) return;
      window.location.reload();
    });
  }

  onDeletePerformanceRange(id: number) {
    this.isLoading = true;

    this.confirmationService.confirm({
      message: 'Are you sure to delete this item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ratingControlService.deletePerformanceRange(id)
          .pipe()
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.notificationService.successNotification('Performance range deleted successfully');
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
