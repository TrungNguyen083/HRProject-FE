import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs';
import { ITemplate } from '../models/evaluation-template.model';
import { EvaluationTemplateService } from '../services/evaluation-template.service';

export interface IEvaluationTemplateState {
    templates: ITemplate[] | null;
}

@Injectable()
export class EvaluationTemplateStore extends ComponentStore<IEvaluationTemplateState> {
  constructor(private evaluationTemplateService: EvaluationTemplateService) {
    super({
        templates: null,
    });
  }

  //SELECTOR
  readonly templates$ = this.select(state => state.templates);

  //UPDATER
  readonly setTemplates = this.updater(
    (
      state: IEvaluationTemplateState,
      templates: ITemplate[],
    ) => {
      return {
        ...state,
        templates,
      };
    },
  );

  //EFFECTS
  readonly getTemplates = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.evaluationTemplateService.getTemplates().pipe(
          tapResponse({
            next: res => this.setTemplates(res.templates),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}
