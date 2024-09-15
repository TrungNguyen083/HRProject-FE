import { Component, OnInit } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { ratingControlTableCol } from '../../constants/evaluation-rating-control.constant';
import { RatingControlStore } from '../../stores/evaluation-rating-control.store';

@Component({
  selector: 'performance-ranking-rating',
  templateUrl: './performance-ranking-rating.component.html',
  styleUrls: ['./performance-ranking-rating.component.scss']
})
export class PerformanceRankingRatingComponent implements OnInit {
  table: HrmsTable<any> = {
    ...defaultTablePagination,
    data: {
      header: ratingControlTableCol,
      body: [],
    },
  };
  
  constructor(private ratingControlStore: RatingControlStore) { }
  
  ngOnInit(): void {
    this.ratingControlStore.getPerformanceRanges();
    this.ratingControlStore.performanceRanges$.subscribe(res => {
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
