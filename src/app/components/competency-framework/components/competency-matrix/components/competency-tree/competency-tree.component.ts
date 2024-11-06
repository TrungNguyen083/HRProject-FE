import { Component, OnInit } from '@angular/core';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { GroupCreateFormComponent } from '../group-create-form/group-create-form.component';
import { Column } from 'src/app/components/employee-dashboard/components/employee-skills/employee-skills.component';
import { cloneDeep } from 'lodash';
import { CompetencyMatrixStore } from '../../stores/competency-matrix.store';
import { CompetencyCreateFormComponent } from '../competency-create-form/competency-create-form.component';
import { CompetencyMatrixService } from '../../services/competency-matrix.service';
import { ICompetency, ICompetencyGroup, ICompetencyTree } from '../../models/competency-matrix.model';


@Component({
  selector: 'app-competency-tree',
  templateUrl: './competency-tree.component.html',
  styleUrls: ['./competency-tree.component.scss'],
  providers: [DialogService]
})
export class CompetencyTreeComponent implements OnInit {
  competencies: TreeNode[] = [];
  modalRef!: DynamicDialogRef;
  cols!: Column[];
  selectedColumns!: Column[];
  isLoading = false;

  constructor(
    public dialogService: DialogService,
    private notificationService: NotificationService,
    private competencyMatrixStore: CompetencyMatrixStore,
    private confirmationService: ConfirmationService,
    private competencyMatrixService: CompetencyMatrixService,
  ) { }

  ngOnInit(): void {
    this.loadMatrix();
  }

  loadMatrix() {
    this.competencyMatrixStore.getCompetencyTree();
    this.competencyMatrixStore.competencyMatrixTree$.subscribe(res => {
      if (!res) return;

      this.competencies = this.transformToTreeNode(res);

      this.cols = [
        { field: 'name', header: 'Competency Name' }
      ];
      this.selectedColumns = this.cols;
    })
  }

  transformToTreeNode(data: ICompetencyTree[]): TreeNode[] {
    return data.map((item: ICompetencyTree) => ({
      data: item.data,
      children: item.children?.map((child: ICompetency) => ({
        data: child,
        expanded: false,
      })),
      expanded: false,
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
      header: 'Competency Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
    });
  }

  onAddGroup(): void {
    this.modalRef = this.dialogService.open(GroupCreateFormComponent, {
      header: 'Competency Group Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
    });
  }

  onUpdateGroup(group: ICompetencyGroup) {
    this.modalRef = this.dialogService.open(GroupCreateFormComponent, {
      header: 'Competency Group Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
      data: {
        group: group,
      },
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
    });
  }

  onDeleteGroup(id: number) {
    this.isLoading = true;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this group?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.competencyMatrixService.deleteCompetencyGroup(id)
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.notificationService.successNotification('Competenty group deleted successfully');
              window.location.reload();
            },
            error: () => {
              this.isLoading = false;
              this.notificationService.errorNotification('Failed to delete comeptency group');
            }
          });
      },
      reject: () => {
        this.isLoading = false;
      }
    });
  }

  onUpdateCompetency(competency: ICompetency) {
    this.modalRef = this.dialogService.open(CompetencyCreateFormComponent, {
      header: 'Competency Form',
      contentStyle: { overflow: 'visible' },
      width: '30vw',
      data: {
        competency: competency,
      },
    });

    this.modalRef.onClose.subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
    });
  }

  onDeleteCompetency(id: number) {
    this.isLoading = true;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this competency?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.competencyMatrixService.deleteCompetency(id)
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.notificationService.successNotification('Competenty deleted successfully');
              window.location.reload();
            },
            error: () => {
              this.isLoading = false;
              this.notificationService.errorNotification('Failed to delete comeptency');
            }
          });
      },
      reject: () => {
        this.isLoading = false;
      }
    });
  }
}
