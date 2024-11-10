import { Component, OnInit } from '@angular/core';
import { CompetencyProgressStore } from '../../stores/competency-progress.store';
import { SumCompetencyEvaluationStore } from 'src/app/components/sum-competency-evaluation/stores/sum-competency-evaluation.store';
import { ITimeline } from 'src/app/components/hr-dashboard/models/hr-dashboard.model';

interface TimelineEvent extends ITimeline {
  icon: string;
}
@Component({
  selector: 'competency-evaluation-timeline',
  templateUrl: './evaluation-timeline.component.html',
  styleUrls: ['./evaluation-timeline.component.scss']
})
export class EvaluationTimelineComponent implements OnInit {
  events!: TimelineEvent[];

  constructor(
    private competencyProgressStore: CompetencyProgressStore,
    private sumCompetencyEvaStore: SumCompetencyEvaluationStore
  ) { }

  ngOnInit(): void {
    this.sumCompetencyEvaStore.currentCycle$.subscribe(cycle => {
      if (!cycle) return;
      this.competencyProgressStore.getEvaluateTimeline(cycle);
    });
    this.competencyProgressStore.evaluateTimeline$.subscribe(
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
