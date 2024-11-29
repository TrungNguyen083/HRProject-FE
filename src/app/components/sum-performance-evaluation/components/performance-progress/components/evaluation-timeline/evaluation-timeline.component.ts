import { Component, OnInit } from '@angular/core';
import { PerformanceProgressStore } from '../../stores/performance-progress.store';
import { SumPerformanceEvaluationStore } from 'src/app/components/sum-performance-evaluation/stores/sum-performance-evaluation.store';
import { ITimeline } from '../../models/performance-progress.model';

interface TimelineEvent extends ITimeline {
  icon: string;
}
@Component({
  selector: 'performance-evaluation-timeline',
  templateUrl: './evaluation-timeline.component.html',
  styleUrls: ['./evaluation-timeline.component.scss']
})
export class EvaluationTimelineComponent implements OnInit {
  events!: TimelineEvent[];

  constructor(
    private performanceProgressStore: PerformanceProgressStore,
    private sumPerformanceEvaStore: SumPerformanceEvaluationStore
  ) { }

  ngOnInit(): void {
    this.sumPerformanceEvaStore.currentCycle$.subscribe(cycle => {
      if (!cycle) return;
      this.performanceProgressStore.getEvaluateTimeline(cycle);
    });
    this.performanceProgressStore.evaluateTimeline$.subscribe(
      result => {
        this.events = result.map((r, i) => ({
          ...r,
          icon: this.getTimelineIcon(i),
        }));
      }
    );
  }

  getTimelineIcon(index: number): string {
    switch (index) {
      case 0:
        return 'pi pi-user-edit';
      case 1:
        return 'pi pi-users';
      case 2:
        return 'pi pi-gift';
      case 3:
        return 'pi pi-check';
      default:
        return '';
    }
  }
}