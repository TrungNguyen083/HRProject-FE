import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { ICategoryRatingApiResponse, IEvaluationFormParams, IPerformanceEvaluationInput, IPerformanceOverallApiResponse, IQuestionRatingApiResponse } from "../models/self-evaluation-form.model";
import { map, Observable } from "rxjs";
import { CREATE_SELF_EVALUATION, GET_PERFORMANCE_CATEGORY_RATING, GET_PERFORMANCE_OVERALL, GET_PERFORMANCE_QUESTION_RATING } from "../constants/self-evaluation-form.constant";

@Injectable({
    providedIn: 'root',
})
export class SelfEvaluationFormService {
    constructor(private apollo: Apollo) { }

    getPerformanceOverall(
        params: IEvaluationFormParams
    ): Observable<IPerformanceOverallApiResponse> {
        return this.apollo
            .watchQuery<IPerformanceOverallApiResponse>({
                query: GET_PERFORMANCE_OVERALL,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCategoryRating(
        params: IEvaluationFormParams
    ): Observable<ICategoryRatingApiResponse> {
        return this.apollo
            .watchQuery<ICategoryRatingApiResponse>({
                query: GET_PERFORMANCE_CATEGORY_RATING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getQuestionRating(
        params: IEvaluationFormParams
    ): Observable<IQuestionRatingApiResponse> {
        return this.apollo
            .watchQuery<IQuestionRatingApiResponse>({
                query: GET_PERFORMANCE_QUESTION_RATING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    createSelfEvaluation(
        input: IPerformanceEvaluationInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_SELF_EVALUATION,
            variables: { input: input },
        })
    }
}