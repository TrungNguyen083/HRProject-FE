import { Component, OnInit } from '@angular/core';
import { HrDashboardShareStore as HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';
import { ITimeline } from '../../models/hr-dashboard.model';

interface TimelineEvent extends ITimeline {
  icon: string;
}
@Component({
  selector: 'competency-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent implements OnInit {
  events!: TimelineEvent[];
  competencyTimeline$ = this.shareStore.competencyTimeline$;

  constructor(private shareStore: HrDashboardShareStore) {}

  ngOnInit(): void {
    // this.shareStore.getCompetencyTimeline(8);
    this.shareStore.activeCycle$.subscribe(cycle => {
      if (!cycle) return;
      this.shareStore.getCompetencyTimeline(cycle);
    });
    this.competencyTimeline$.subscribe(
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
