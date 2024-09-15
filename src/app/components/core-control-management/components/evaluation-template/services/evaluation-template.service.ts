import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { ITemplateApiResponse } from '../models/evaluation-template.model';
import { GET_TEMPLATE } from '../constants/evaluation-template.constant';

@Injectable({
  providedIn: 'root',
})
export class EvaluationTemplateService {
  constructor(private apollo: Apollo) {}

  getTemplates(): Observable<ITemplateApiResponse> {
    return this.apollo
      .watchQuery<ITemplateApiResponse>({
        query: GET_TEMPLATE
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
