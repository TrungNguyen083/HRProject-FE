import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { IEvaluateCycleTimelineApiResponse, IPerformanceEvaluationPagingApiResponse, IPerformanceEvaluationPagingParams, IPerformanceEvaluationTitleApiResponse } from "../models/performance-progress.model";
import { map, Observable } from "rxjs";
import { GET_EVALUATE_TIMELINE, GET_PERFORMANCE_EVALUATION_PAGING, GET_PERFORMANCE_EVALUATION_TITLE } from "../constants/performance-progress.constant";

@Injectable({
    providedIn: 'root',
})

export class PerformanceProgressService {
    constructor(private apollo: Apollo) { }

    getPerformanceEvaluationPaging(
        params: IPerformanceEvaluationPagingParams
    ):
        Observable<IPerformanceEvaluationPagingApiResponse> {
        return this.apollo
            .watchQuery<IPerformanceEvaluationPagingApiResponse>({
                query: GET_PERFORMANCE_EVALUATION_PAGING,
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

    getPerformanceEvaluationTitle(
        cycleId: number,
    ): Observable<IPerformanceEvaluationTitleApiResponse> {
        return this.apollo
            .watchQuery<IPerformanceEvaluationTitleApiResponse>({
                query: GET_PERFORMANCE_EVALUATION_TITLE,
                variables: { cycleId },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}
