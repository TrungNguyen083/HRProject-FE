import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType, Plugin } from 'chart.js';
import { UIChart } from 'primeng/chart';
import { themeColors as colors } from '../constants/share.constants';
import { ApexChartOptions } from '../models/chart.model';

export const pieChartColors: string[] = [
  colors.primary,
  colors.primaryLight,
  colors.primaryLight1,
  colors.primaryLight2,
  colors.primaryLight3,
];

export const radarChartColors = [
  {
    borderColor: colors.primaryLight3,
    backgroundColor: 'rgba(205, 233, 234, 0.2)',
  },
  {
    borderColor: colors.lightGreen,
    backgroundColor: 'rgba(130, 196, 90, 0.2)',
  },
  {
    borderColor: '#FF6384', // Pinkish Red
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
  },
  {
    borderColor: '#36A2EB', // Light Blue
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
  },
  {
    borderColor: '#FFCE56', // Yellow
    backgroundColor: 'rgba(255, 206, 86, 0.2)',
  },
  {
    borderColor: '#4BC0C0', // Teal
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
  },
  {
    borderColor: '#9966FF', // Purple
    backgroundColor: 'rgba(153, 102, 255, 0.2)',
  },
  {
    borderColor: '#FF9F40', // Orange
    backgroundColor: 'rgba(255, 159, 64, 0.2)',
  },
  {
    borderColor: '#FF6384', // Deep Red
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
  },
  {
    borderColor: '#8E44AD', // Violet
    backgroundColor: 'rgba(142, 68, 173, 0.2)',
  },
];


export const colorObj = {
  primary: colors.primary,
  secondary: colors.secondary,
  primaryLight: colors.primaryLight,
  primaryLight1: colors.primaryLight1,
  primaryLight2: colors.primaryLight2,
  primaryLight3: colors.primaryLight3,
  primaryLight4: colors.primaryLight4,
  primaryLight5: colors.primaryLight5,
  third: colors.third,
  forth: colors.forth,
  fifth: colors.fifth,
  errors: colors.errors,
  warning: colors.warning,
  success: colors.success,
  danger: colors.danger,
  lightGreen: colors.lightGreen,
  whiteGreen: colors.whiteGreen,
};
@Component({
  selector: 'hrms-chart',
  templateUrl: './hrms-chart.component.html',
  styleUrls: ['./hrms-chart.component.scss'],
})
export class HrmsChartComponent {
  @ViewChild('chartJS') chartJS!: UIChart;
  @Input() type!: ChartType | 'heatmap';
  @Input() data!: ChartData;
  @Input() options!: ChartOptions;
  @Input() apexOptions!: ApexChartOptions;
  @Input() plugins!: Plugin[];
  @Input() width!: string;
  @Input() height!: string;
  @Output() dataSelect = new EventEmitter();

  onDataSelect(e: unknown): void {
    this.dataSelect.emit(e);
  }
}
