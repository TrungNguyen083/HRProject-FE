import { Component, OnInit } from '@angular/core';
import { ITemplate } from '../../models/evaluation-template.model';
import { EvaluationTemplateStore } from '../../stores/evaluation-template.store';

@Component({
  selector: 'app-evaluation-template-list',
  templateUrl: './evaluation-template-list.component.html',
  styleUrls: ['./evaluation-template-list.component.scss']
})
export class EvaluationTemplateListComponent implements OnInit {
  templates!: ITemplate[];

  constructor(private evaluationTemplateStore: EvaluationTemplateStore) { }

  
  ngOnInit(): void {
    this.evaluationTemplateStore.getTemplates();
    this.evaluationTemplateStore.templates$.subscribe(res => {
      if (!res) return;
      this.templates = res;
    })
  }
}
