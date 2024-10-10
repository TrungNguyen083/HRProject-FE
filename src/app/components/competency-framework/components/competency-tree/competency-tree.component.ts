import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { CompetencyCreateFormComponent } from '../competency-create-form/competency-create-form.component';
import { GroupCreateFormComponent } from '../group-create-form/group-create-form.component';
import { Column } from 'src/app/components/employee-dashboard/components/employee-skills/employee-skills.component';
import { cloneDeep } from 'lodash';

const mockData = [
  {
    data: { name: 'Self Competencies' },
    children: [
      { data: { name: 'Problem Solving' } },
      { data: { name: 'Willing to learn' } }
    ]
  },
  {
    data: { name: 'Social Competencies' },
    children: [
      { data: { name: 'Communication' } },
      { data: { name: 'Team Spirit' } },
      { data: { name: 'Customer orientation' } }
    ]
  }
];

@Component({
  selector: 'app-competency-tree',
  templateUrl: './competency-tree.component.html',
  styleUrls: ['./competency-tree.component.scss'],
  providers: [DialogService] // Ensure DialogService is provided
})
export class CompetencyTreeComponent implements OnInit {
  competencies: TreeNode[] = [];
  modalRef!: DynamicDialogRef;

  cols!: Column[];
  selectedColumns!: Column[];

  constructor(
    public dialogService: DialogService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.competencies = this.transformToTreeNode(mockData);
    this.cols = [
      { field: 'name', header: 'Competency Name' }
    ];
    this.selectedColumns = this.cols;
  }

  transformToTreeNode(data: any[]): TreeNode[] {
    return data.map(item => ({
      data: item.data,
      children: item.children ? this.transformToTreeNode(item.children) : []
    }));
  }

  expandAllNodes(): void {
    const temp = cloneDeep(this.competencies);
    temp.forEach(node => {
      this.expandCollapseRecursive(node, true);
    });
    this.competencies = temp;
  }

  collapseAllNodes(): void {
    const temp = cloneDeep(this.competencies);
    temp.forEach(node => {
      this.expandCollapseRecursive(node, false);
    });
    this.competencies = temp;
  }

  private expandCollapseRecursive(node: TreeNode, isExpand: boolean): void {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandCollapseRecursive(childNode, isExpand);
      });
    }
  }

  onAddCompetency(): void {
    this.modalRef = this.dialogService.open(CompetencyCreateFormComponent, {
      header: 'Add Competency',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        this.notificationService.successNotification('Competency added successfully');
        this.loadCompetencies();
      }
    });
  }

  onAddGroup(): void {
    this.modalRef = this.dialogService.open(GroupCreateFormComponent, {
      header: 'Add Group',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        this.notificationService.successNotification('Group added successfully');
        this.loadCompetencies();
      }
    });
  }

  loadCompetencies(): void {
    this.competencies = this.transformToTreeNode(mockData);
  }

  // Add the isNumber method here
  isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}
