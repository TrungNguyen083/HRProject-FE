import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { radarChartOptions } from 'src/app/components/share/constants/chart.constant';
import { radarChartColors } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { IDropdownItem } from 'src/app/models/global.model';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { mapToDropdownOptions } from 'src/app/utils/mapToDropdownOptions';
import { SumDashboardStore } from '../../stores/sum-dashboard.store';
import { ICompetencyGapRadarChartParams, IDepartmentEmployee, IEvaluateCycle } from '../../models/sum-dashboard.model';


@Component({
  selector: 'radar-chart-competency-gap',
  templateUrl: './radar-chart-competency-gap.component.html',
  styleUrls: ['./radar-chart-competency-gap.component.scss']
})
export class RadarChartCompetencyGapComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = radarChartOptions;
  cycles!: IEvaluateCycle[];
  cycleOptions!: IDropdownItem[];
  selectedCycle!: IDropdownItem;
  employees!: IDepartmentEmployee[];
  selectedEmployees!: IDepartmentEmployee[];
  lebels: string[] = [];
  params!: ICompetencyGapRadarChartParams;
  departmentOptions!: IDropdownItem[];

  @Output() handleSelectItem = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private sumDashboardStore: SumDashboardStore
  ) { }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.sumDashboardStore.evaluateCycles$.subscribe(cycles => {
      if (!cycles) return;
      this.cycleOptions = mapToDropdownOptions(
        cycles,
        'evaluateCycleName',
        'id',
      );

      if (!this.cycleOptions.length) return;
      this.selectedCycle = this.cycleOptions[1];

      this.params = { ...this.params, cycleId: this.selectedCycle.value }
    });

    this.sumDashboardStore.departmentId$.subscribe(departmentId => {
      if (!departmentId) return;
      this.sumDashboardStore.getDepartmentEmployee(departmentId);
      this.sumDashboardStore.employeesInDepartment$.subscribe(res => {
        if (!res) return;
        this.employees = res;
        if (this.employees && this.employees.length > 0) {
          this.selectedEmployees = this.employees.length >= 3
            ? this.employees.slice(0, 3)
            : [...this.employees];

          this.params = {
            ...this.params,
            employeeIds: this.selectedEmployees.map(employee => employee.id)
          }

          this.sumDashboardStore.getCompetencyGapRadarChart(this.params);
        }
      })
    })

    this.sumDashboardStore.departmentCompetencyGap$.subscribe(res => {
      if (!res || !res.datasets) {
        this.notificationService.warnNotification("This department doesn't have any data");
        return;
      }

      const datasets = res.datasets.map((data, i) => {
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
        labels: res.labels,
        datasets,
      };
    })
  }

  onSelectItem() {
    this.handleSelectItem.emit(this.selectedCycle);
    this.params = { ...this.params, cycleId: this.selectedCycle.value }
    this.sumDashboardStore.getCompetencyGapRadarChart(this.params);
  }

  onEmployeeSelectionChange(event: any): void {
    this.selectedEmployees = event.value;
  
    this.params = {
      ...this.params,
      employeeIds: this.selectedEmployees.map(employee => employee.id)
    };
  
    this.sumDashboardStore.getCompetencyGapRadarChart(this.params);
  }
}
