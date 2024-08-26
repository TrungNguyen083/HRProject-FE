import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import _ from 'lodash';
import { HrmsTable } from 'src/app/components/share/models/hrms-table.model';
import {
  PageChangeEvent,
  PagingInfo,
} from 'src/app/components/share/models/pagingInfo.model';
import { topSkillsTableCol } from '../../constants/employee-summary-dashboard.constant';

@Component({
  selector: 'employee-score-table',
  templateUrl: './employee-score-table.component.html',
  styleUrls: ['./employee-score-table.component.scss'],
})
export class EmployeeScoreTableComponent<IEmployeeScore> implements OnChanges {
  @Input() tableData: IEmployeeScore[] = [];
  @Input() tableHeader!: string;
  @Input() pagination!: PagingInfo;
  @Output() pageChage = new EventEmitter();

  table: HrmsTable<IEmployeeScore> = this.createTable(this.tableData);
  shortTable: HrmsTable<IEmployeeScore> = this.createTable(this.tableData);
  isFullTableShown = false;
  pageGapNumber = 1;

  ngOnChanges(): void {
    this.updateTables();
  }

  onPageChange(e: PageChangeEvent) {
    this.pageChage.emit(e);
  }

  showFullTable() {
    this.isFullTableShown = true;
  }

  private createTable(data: IEmployeeScore[]): HrmsTable<IEmployeeScore> {
    return {
      ...this.pagination,
      data: {
        header: topSkillsTableCol,
        body: data,
      },
    };
  }
  private updateTables(): void {
    this.table = {
      ...this.pagination,
      data: {
        header: [...this.table.data.header],
        body: this.tableData,
      },
    };
    this.shortTable.data.body = _.take(this.tableData, 5);
  }
}
