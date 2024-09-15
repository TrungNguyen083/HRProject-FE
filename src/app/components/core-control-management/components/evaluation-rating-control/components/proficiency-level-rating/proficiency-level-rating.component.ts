import { Component, OnInit } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { ratingControlTableCol } from '../../constants/evaluation-rating-control.constant';
import { RatingControlService } from '../../services/evaluation-rating-control.service';
import { RatingControlStore } from '../../stores/evaluation-rating-control.store';

@Component({
  selector: 'proficiency-level-rating',
  templateUrl: './proficiency-level-rating.component.html',
  styleUrls: ['./proficiency-level-rating.component.scss'],
})
export class ProficiencyLevelRatingComponent implements OnInit {
  table: HrmsTable<any> = {
    ...defaultTablePagination,
    data: {
      header: ratingControlTableCol,
      body: [],
    },
  };

  constructor(private ratingControlStore: RatingControlStore) { }

  ngOnInit(): void {
    this.ratingControlStore.getProficiencyLevels();
    this.ratingControlStore.proficiencyLevels$.subscribe(res => {
      if (!res) return;
      this.table = {
        ...this.table,
        data: {
          header: [...this.table.data.header],
          body: res,
        },
      };
    })
  }
}
