import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IDropdownItem } from 'src/app/models/global.model';
import { mapToDropdownOptions } from 'src/app/utils/mapToDropdownOptions';
import { HrDashboardShareStore } from '../../store/hr-dashboard-share-store.service';

@Component({
  selector: 'position-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.scss'],
})
export class PositionFilterComponent implements OnInit {
  positionOptions!: IDropdownItem[];
  selectedPosition!: IDropdownItem;

  @Output() handleSelectItem = new EventEmitter();

  constructor(private shareStore: HrDashboardShareStore) {}

  ngOnInit(): void {
    this.shareStore.getPositions();
    this.shareStore.positions$.subscribe(positions => {
      const options = mapToDropdownOptions(
        positions,
        'positionName',
        'id',
      );
      this.positionOptions = [
        {
          label: 'All',
          value: -1,
        },
        ...options,
      ];
      this.selectedPosition = this.positionOptions[0];
      this.onSelectItem();
    });
  }

  onSelectItem() {
    this.handleSelectItem.emit(this.selectedPosition);
  }
}
