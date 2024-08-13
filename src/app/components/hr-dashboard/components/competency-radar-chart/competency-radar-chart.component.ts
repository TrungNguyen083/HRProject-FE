import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { radarChartOptions } from 'src/app/components/share/constants/chart.constant';
import { radarChartColors } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { IDropdownItem } from 'src/app/models/global.model';
import { mapToDropdownOptions } from 'src/app/utils/mapToDropdownOptions';
import { CompetencyScoreStoreService as CompetencyScoreStore } from '../../store/competency-score-store.service';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'competency-radar-chart',
  templateUrl: './competency-radar-chart.component.html',
  styleUrls: ['./competency-radar-chart.component.scss'],
})
export class CompetencyRadarChartComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = radarChartOptions;
  filterForm!: FormGroup;
  competencyRadarChart$ = this.competencyScoreStore.competencyRadarChart$;
  lebels: string[] = [];
  scoreParams = { evaluateCycleIds: [3, 4], departmentId: 1 };
  cycleOptions!: IDropdownItem[];
  departmentOptions!: IDropdownItem[];

  constructor(
    private fb: FormBuilder,
    private competencyScoreStore: CompetencyScoreStore,
    private shareStore: HrDashboardShareStore,
    private notificationService: NotificationService,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.shareStore.evaluateCycles$.subscribe(cycles => {
      // if(!cycles.length) return;
      this.cycleOptions = mapToDropdownOptions(
        cycles,
        'evaluateCycleName',
        'id',
      );
      if (!this.cycleOptions.length) return;
      this.filterForm.patchValue({
        evaluateCyclesId: [
          this.cycleOptions[0].value,
          this.cycleOptions[1].value,
        ],
      });
    });

    this.shareStore.departments$.subscribe(departments => {
      this.departmentOptions = mapToDropdownOptions(
        departments,
        'departmentName',
        'id',
      );
      if (!this.departmentOptions.length) return;
      this.filterForm.patchValue({
        departmentId: this.departmentOptions[0].value,
      });
    });

    this.competencyScoreStore.getCompetencyRadarChart(this.scoreParams);
    this.competencyRadarChart$.subscribe(result => {
      if (!result || !result.datasets) {
        this.notificationService.warnNotification("This department doesn't have any data");
        return;
      }
      const datasets = result.datasets.map((data, i) => {
        const colorObj = radarChartColors[i];

        return {
          label: data.lineName,
          borderColor: colorObj.borderColor,
          backgroundColor: colorObj.backgroundColor,
          pointBackgroundColor: colorObj.borderColor,
          pointBorderColor: colorObj.borderColor,
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: colorObj.borderColor,
          data: data.dataset, 
        };
      });

      this.data = {
        labels: result.labels,
        datasets,
      };
    });
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      departmentId: '',
      evaluateCycleIds: '',
    });
  }

  onFilter(op: OverlayPanel): void {
    const params = this.filterForm.value;
    this.competencyScoreStore.getCompetencyRadarChart(params);

    op.hide();
  }
}
