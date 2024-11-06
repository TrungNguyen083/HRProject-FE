import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { ICompetencyEvaluationInput, ICompetencyFormApiResponse, ICompetencyGroupApiResponse, ICompetencyOverallApiResponse, ICompetencySubmit, IEvaluationFormParams } from "../models/evaluation-form.model";
import { map, Observable } from "rxjs";
import { CREATE_SELF_EVALUATION, GET_COMPETENCY_FORM, GET_COMPETENCY_GROUP, GET_COMPETENCY_OVERALL } from "../constants/evaluation-form.constant";

@Injectable({
    providedIn: 'root',
})
export class EvaluationFormService {
    constructor(private apollo: Apollo) { }

    getCompetencyOverall(
        params: IEvaluationFormParams
    ): Observable<ICompetencyOverallApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyOverallApiResponse>({
                query: GET_COMPETENCY_OVERALL,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyForm(
        params: IEvaluationFormParams
    ): Observable<ICompetencyFormApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyFormApiResponse>({
                query: GET_COMPETENCY_FORM,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyGroup(
        params: IEvaluationFormParams
    ): Observable<ICompetencyGroupApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyGroupApiResponse>({
                query: GET_COMPETENCY_GROUP,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    createSelfEvaluation(
        input: ICompetencyEvaluationInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_SELF_EVALUATION,
            variables: { input: input },
        })
    }
}