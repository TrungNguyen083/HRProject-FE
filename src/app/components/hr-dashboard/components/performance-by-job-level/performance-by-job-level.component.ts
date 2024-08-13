import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { horizontalStackedBarOptions } from 'src/app/components/share/constants/chart.constant';
import { colorObj } from 'src/app/components/share/hrms-chart/hrms-chart.component';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';

@Component({
  selector: 'performance-by-job-level',
  templateUrl: './performance-by-job-level.component.html',
  styleUrls: ['./performance-by-job-level.component.scss'],
})
export class PerformanceByJobLevelComponent implements OnInit {
  data!: ChartData;
  options: ChartOptions = horizontalStackedBarOptions;
  plugins = [ChartDataLabels];
  params = { positionId: -1, cycleId: 1 };
  performanceByJobLevel$ = this.shareStore.performanceByJobLevel$;

  constructor(private shareStore: HrDashboardShareStore) {

  }

  ngOnInit() {
    this.shareStore.previousCycle$.subscribe(cycle => {
      if (!cycle) return;
      this.params = {
        ...this.params,
        cycleId: cycle
      }
      this.shareStore.getPerformanceByLevel(this.params);
    });

    this.performanceByJobLevel$.subscribe(result => {
      this.data = {
        labels: result?.labels.map(item => item.jobLevelName),
        datasets: result?.datasets.map(item => ({
          type: 'bar',
          label: item.tag,
          backgroundColor: this.getColor(item.tag),
          data: item.data,
        })) || [],
      }
    })


    // this.performanceByJobLevel$.subscribe(result => {
    //   const filteredLabels = result?.labels.filter((_, index) => 
    //     result.datasets.some(dataset => dataset.data[index] !== 0)
    //   );

    //   const filteredDatasets = result?.datasets.map(dataset => ({
    //     ...dataset,
    //     data: dataset.data.filter((value, index) => 
    //       result.labels[index] && value !== 0
    //     )
    //   })).filter(dataset => dataset.data.length > 0);

    //   this.data = {
    //     labels: filteredLabels.map(item => item.jobLevelName),
    //     datasets: filteredDatasets.map(item => ({
    //       type: 'bar' as const,
    //       label: item.tag,
    //       backgroundColor: this.getColor(item.tag),
    //       data: item.data,
    //     })) as ChartDataset<'bar'>[],
    //   }
    // })




    // this.data = {
    //   labels: ['Expert', 'Senior Level', 'Professional Level', 'Junior Level'],
    //   datasets: [
    //     {
    //       type: 'bar',
    //       label: 'Too early to evaluate',
    //       backgroundColor: colorObj.primary,
    //       data: [10, 20, 10, 30],
    //     },
    //     {
    //       type: 'bar',
    //       label: 'Unsatisfactory',
    //       backgroundColor: colorObj.primaryLight,
    //       data: [20, 20, 10, 8],
    //     },
    //     {
    //       type: 'bar',
    //       label: 'Partially meet expectation',
    //       backgroundColor: colorObj.primaryLight1,
    //       data: [30, 20, 10, 20],
    //     },
    //     {
    //       type: 'bar',
    //       label: 'Meet expectation',
    //       backgroundColor: colorObj.primaryLight4,
    //       data: [12, 20, 20, 20],
    //     },
    //     {
    //       type: 'bar',
    //       label: 'Partially exceed expectation',
    //       backgroundColor: colorObj.primaryLight2,
    //       data: [8, 12, 30, 10],
    //     },
    //     {
    //       type: 'bar',
    //       label: 'Oustanding',
    //       backgroundColor: colorObj.primaryLight3,
    //       data: [20, 8, 20, 12],
    //     },
    //   ],
    // };
  }

  private getColor(tag: string) {
    switch (tag) {
      case "Not Evaluated":
        return colorObj.primaryLight;
      case "Unsatisfactory":
        return colorObj.primaryLight1;
      case "Partially meet expectation":
        return colorObj.primary;
      case "Meet expectation":
        return colorObj.primaryLight4;
      case "Partially exceed expectation":
        return colorObj.primaryLight2;
      case "Outstanding":
        return colorObj.primaryLight3;
      default:
        return colorObj.primaryLight5;
    }
  }

  private initChart(): void {

  }
}
