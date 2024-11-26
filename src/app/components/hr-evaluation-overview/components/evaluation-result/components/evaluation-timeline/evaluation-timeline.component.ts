import { Component, OnInit } from '@angular/core';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';
import { EvaluationResultStore } from '../../stores/evaluation-result.store';
import { ITimeline } from 'src/app/components/sum-competency-evaluation/components/competency-progress/models/competency-progress.model';

interface TimelineEvent extends ITimeline {
  icon: string;
}
@Component({
  selector: 'evaluation-timeline',
  templateUrl: './evaluation-timeline.component.html',
  styleUrls: ['./evaluation-timeline.component.scss']
})
export class EvaluationTimelineComponent implements OnInit {
  events!: TimelineEvent[];

  constructor(
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore,
    private evaluationResultStore: EvaluationResultStore
  ) { }

  ngOnInit(): void {
    this.hrEvaluationOverviewStore.currentCycle$.subscribe(cycle => {
      if (!cycle) return;
      this.evaluationResultStore.getEvaluateTimeline(cycle);
    });
    this.evaluationResultStore.evaluateTimeline$.subscribe(
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
