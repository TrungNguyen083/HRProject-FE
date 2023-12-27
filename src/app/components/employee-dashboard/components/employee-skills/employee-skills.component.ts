import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { TreeNode } from 'primeng/api';
import { EmployeeSkillsStore } from './store/employee-skills-store.service';
import { IEmployeeSkillMatrix } from './models/employee-skills.model';

interface Column {
  field: string;
  header: string;
  togglable?: boolean;
  toggleText?: string;
  suffix?: string;
}

@Component({
  selector: 'app-employee-skills',
  templateUrl: './employee-skills.component.html',
  styleUrls: ['./employee-skills.component.scss'],
})
export class EmployeeSkillsComponent implements OnInit {
  competencies!: IEmployeeSkillMatrix[];
  cols!: Column[];
  selectedColumns!: Column[];

  constructor(private store: EmployeeSkillsStore){}

  ngOnInit(): void {
    this.store.getEmployeeSkillsMatrix(4)
    this.store.employeeSkillsMatrix$.subscribe(data => {
      this.competencies = data
    })
    this.cols = [
      {
        field: 'targetSkillLevel',
        header: 'Target Skill Level',
      },
      {
        field: 'skillLevelTotal',
        header: 'Skill Level (Total)',
        togglable: true,
        toggleText: 'Average ratings',
      },
      {
        field: 'skillLevelSelf',
        header: 'Skill Level (Self)',
        togglable: true,
        toggleText: 'Self-assessment',
      },
      {
        field: 'skillLevelManager',
        header: 'Skill Level (Manager)',
        togglable: true,
        toggleText: 'Supervisor assessment',
      },
      {
        field: 'competencyLevel',
        header: 'Competency Level',
        suffix: '%'
      },
    ];
    this.selectedColumns = this.cols;

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
}
