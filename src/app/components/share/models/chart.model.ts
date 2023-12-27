import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

import {ChartOptions} from 'chart.js'

export interface HrmsChartOptions
  extends ApexChartOptions,
    ChartOptions {}

export interface ApexChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend?: ApexLegend;
  dataLabels: ApexDataLabels;
  apexResponsive?: ApexResponsive[];
  colors: string[];
  grid: ApexGrid;
}

export interface DonutChartOptions extends ChartOptions {
  cutout?: string;
}