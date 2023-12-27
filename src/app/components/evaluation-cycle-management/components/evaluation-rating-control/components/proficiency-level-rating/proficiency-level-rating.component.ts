import { Component, OnInit } from '@angular/core';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import { defaultTablePagination } from 'src/app/constants/app.constant';
import { proficiencyLevelRatingTableCol } from '../../constants/evaluation-rating-control.constant';
import { EvaluationRatingControlService } from '../../services/evaluation-rating-control.service';

@Component({
  selector: 'proficiency-level-rating',
  templateUrl: './proficiency-level-rating.component.html',
  styleUrls: ['./proficiency-level-rating.component.scss'],
})
export class ProficiencyLevelRatingComponent implements OnInit {
  table: HrmsTable<any> = {
    ...defaultTablePagination,
    data: {
      header: proficiencyLevelRatingTableCol,
      body: [],
    },
  };

  constructor(private evalRatingService: EvaluationRatingControlService) {}
  ngOnInit(): void {
    const data = this.evalRatingService.getProficiencyLevels();
    this.table = {
      ...this.table,
      data: {
        header: [...this.table.data.header],
        body: data,
      },
    };
  }
}
