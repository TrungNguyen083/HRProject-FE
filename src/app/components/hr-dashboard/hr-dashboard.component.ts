import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IDropdownItem } from 'src/app/models/global.model';
import { HrDashboardShareStore } from './store/hr-dashboard-share-store.service';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss'],
})
export class HrDashboardComponent implements OnInit {
  cycleOptions!: IDropdownItem[];
  competencyCycle$ = this.shareStore.competencyCycles$;

  constructor(private shareStore: HrDashboardShareStore) {}

  ngOnInit(): void {
    this.shareStore.getCompetencyCycles();
    this.competencyCycle$.subscribe(cycles => {
      this.cycleOptions = cycles.map((c, i) => {
        if (i === 0) {
          this.shareStore.setActiveCycle(c.id);
        }
        return {
          label: c.competencyCycleName,
          value: c.id,
        };
      });
    });
  }

  onSelectCycle(e: SelectItem) {
    this.shareStore.setActiveCycle(e.value);
  }
}
