import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IQualificationFile } from '../../models/employee-qualification.model';

@Component({
  selector: 'employee-file-item',
  templateUrl: './employee-file-item.component.html',
  styleUrls: ['./employee-file-item.component.scss'],
})
export class EmployeeFileItemComponent {
  @Input() qualification!: IQualificationFile;
  visible = false
  menuItems: MenuItem[] = [
    {
      label: 'View file detail',
      command: () => this.showFileDetail()
    },
  ];

  showFileDetail() {
    this.visible = true
  }
}
