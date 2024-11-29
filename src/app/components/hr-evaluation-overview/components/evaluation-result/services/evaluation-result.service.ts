import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { IEvaluationResultPagingApiResponse, IEvaluationResultParams, IEvaluationResultTitleApiResponse } from "../models/evaluation-result.model";
import { map, Observable } from "rxjs";
import { CREATE_REQUEST_PROMOTION, GET_EVALUATION_RESULT_PAGING, GET_EVALUATION_RESULT_TITLE } from "../constants/evaluation-result.constant";
import { GET_EVALUATE_TIMELINE } from "src/app/components/sum-competency-evaluation/components/competency-progress/constants/competency-progress.constant";
import { IEvaluateCycleTimelineApiResponse } from "src/app/components/sum-competency-evaluation/components/competency-progress/models/competency-progress.model";
import { ICompareParams } from "../../evaluation-compare/models/evaluation-compare.model";

@Injectable({
    providedIn: 'root',
})
export class EvaluationResultService {
    constructor(private apollo: Apollo) { }

    getEvaluationOverviewList(
        params: IEvaluationResultParams
    ):
        Observable<IEvaluationResultPagingApiResponse> {
        return this.apollo
            .watchQuery<IEvaluationResultPagingApiResponse>({
                query: GET_EVALUATION_RESULT_PAGING,
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

    getEvaluationTitle(
        cycleId: number,
    ): Observable<IEvaluationResultTitleApiResponse> {
        return this.apollo
            .watchQuery<IEvaluationResultTitleApiResponse>({
                query: GET_EVALUATION_RESULT_TITLE,
                variables: { cycleId },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    createRequestPromotion(
        employeeIds: number[],
        cycleId: number,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_REQUEST_PROMOTION,
            variables: { employeeIds, cycleId },
        })
    }
}