import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { ICompetencyEvaluationPagingApiResponse, ICompetencyEvaluationPagingParams, ICompetencyEvaluationTitleApiResponse, IEvaluateCycleTimelineApiResponse } from "../models/competency-progress.model";
import { GET_COMPETENCY_EVALUATION_PAGING, GET_COMPETENCY_EVALUATION_TITLE, GET_EVALUATE_TIMELINE } from "../constants/competency-progress.constant";

@Injectable({
    providedIn: 'root',
})

export class CompetencyProgressService {
    constructor(private apollo: Apollo) { }

    getCompetencyEvaluationPaging(
        params: ICompetencyEvaluationPagingParams
    ):
        Observable<ICompetencyEvaluationPagingApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyEvaluationPagingApiResponse>({
                query: GET_COMPETENCY_EVALUATION_PAGING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getEvaluateTimeline(
        evaluateCycleId: number,
    ): Observable<IEvaluateCycleTimelineApiResponse> {
        return this.apollo
            .watchQuery<IEvaluateCycleTimelineApiResponse>({
                query: GET_EVALUATE_TIMELINE,
                variables: { evaluateCycleId },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyEvaluationTitle(
        cycleId: number,
    ): Observable<ICompetencyEvaluationTitleApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyEvaluationTitleApiResponse>({
                query: GET_COMPETENCY_EVALUATION_TITLE,
                variables: { cycleId },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}
