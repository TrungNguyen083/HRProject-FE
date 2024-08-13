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
  selectedCycle!: number;
  evaluateCycles$ = this.shareStore.evaluateCycles$;

  constructor(private shareStore: HrDashboardShareStore) { }

  ngOnInit(): void {
    this.shareStore.getEvaluateCycles();
    this.evaluateCycles$.subscribe(evaluateCycles => {
      if(!evaluateCycles.length) return;

      const previousCycle = evaluateCycles.find(c => c.status === "Completed");
      if (previousCycle) {
        this.shareStore.setPreviousCycle(previousCycle.id);
        this.selectedCycle = previousCycle.id;
      }

      const currentCycle = evaluateCycles.find(c => c.status === "In Progress");
      if (currentCycle) {
        this.shareStore.setCurrentCycle(currentCycle.id);
      }

      this.cycleOptions = evaluateCycles.map(c => ({
        label: c.evaluateCycleName,
        value: c.id,
      }));
    });
  }

  onSelectCycle(e: SelectItem) {
    this.shareStore.setPreviousCycle(e.value);
  }
}
