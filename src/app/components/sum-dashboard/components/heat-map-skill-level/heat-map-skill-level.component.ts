import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import * as _ from 'lodash';
import { heatmapChartOptions } from 'src/app/components/share/constants/chart.constant';
import { ApexChartOptions } from 'src/app/components/share/models/chart.model';
import { IDropdownItem } from 'src/app/models/global.model';
import { IEvaluateCycle, IDepartmentEmployee, IHeatMapSkillLevelParams, ICompetency } from '../../models/sum-dashboard.model';
import { SumDashboardStore } from '../../stores/sum-dashboard.store';
import { mapToDropdownOptions } from 'src/app/utils/mapToDropdownOptions';


@Component({
  selector: 'heat-map-skill-level',
  templateUrl: './heat-map-skill-level.component.html',
  styleUrls: ['./heat-map-skill-level.component.scss']
})
export class HeatMapSkillLevelComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ApexChartOptions = heatmapChartOptions;
  dataSeries: { name: string; data: { x: string; y: number }[] }[] = [];
  cycles!: IEvaluateCycle[];
  cycleOptions!: IDropdownItem[];
  selectedCycle!: IDropdownItem;
  employees!: IDepartmentEmployee[];
  selectedEmployees!: IDepartmentEmployee[];
  competencies!: ICompetency[];
  selectedCompetencies!: ICompetency[];
  params!: IHeatMapSkillLevelParams;

  @Output() handleSelectItem = new EventEmitter();

  constructor(private sumDashboardStore: SumDashboardStore) { }

  ngOnInit(): void {
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

    this.sumDashboardStore.getCompetencies();
    this.sumDashboardStore.competencies$.subscribe(competencies => {
      if (!competencies) return;
      this.competencies = competencies;
      if (this.competencies && this.competencies.length > 0) {
        this.selectedCompetencies = this.competencies.length >= 3
          ? this.competencies.slice(0, 3)
          : [...this.competencies];

        this.params = {
          ...this.params,
          competencyIds: this.selectedCompetencies.map(competency => competency.id)
        }
      }
    });

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

        this.sumDashboardStore.getHeatMapSkillLevel(this.params);
      }
    });


    this.sumDashboardStore.departmentSkillHeatMap$.subscribe(res => {
      if (!res) return;
      const series = _(res)
        .groupBy('verticalColumnName')
        .map((values, key) => ({
          name: key,
          data: values.map(({ horizontalColumnName, score }) => ({
            x: horizontalColumnName,
            y: score,
          })),
        }))
        .value();
      this.dataSeries = series;
      this.initHeatmapData();
    })



  }

  private initHeatmapData(): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: this.dataSeries,
    };
  }

  onSelectItem() {
    this.handleSelectItem.emit(this.selectedCycle);
    this.params = { ...this.params, cycleId: this.selectedCycle.value }
    this.sumDashboardStore.getHeatMapSkillLevel(this.params);
  }

  onEmployeeSelectionChange(event: any): void {
    this.selectedEmployees = event.value;

    this.params = {
      ...this.params,
      employeeIds: this.selectedEmployees.map(employee => employee.id)
    };

    this.sumDashboardStore.getHeatMapSkillLevel(this.params);
  }

  onCompetencySelectionChange(event: any): void {
    this.selectedCompetencies = event.value;

    this.params = {
      ...this.params,
      competencyIds: this.selectedCompetencies.map(competency => competency.id)
    };

    this.sumDashboardStore.getHeatMapSkillLevel(this.params);
  }
}
