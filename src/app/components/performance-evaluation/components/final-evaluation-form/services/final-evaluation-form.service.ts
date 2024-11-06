import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { IEvaluationFormParams } from "../../self-evaluation-form/models/self-evaluation-form.model";
import { map, Observable } from "rxjs";
import { IFinalCategoryRatingApiResponse, IFinalPerformanceOverallApiResponse, IFinalQuestionRatingApiResponse } from "../models/final-evaluation-form.model";
import { GET_EMPLOYEE_FEEDBACK } from "src/app/components/competency-evaluation/components/manager-evaluation-form/constants/manager-evaluation-form.constant";
import { IEmployeeFeedbackApiResponse } from "src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model";
import { GET_FINAL_CATEGORY_RATING, GET_FINAL_OVERALL, GET_FINAL_QUESTION_RATING } from "../constants/final-evaluation-form.constant";

@Injectable({
    providedIn: 'root',
})
export class FinalEvaluationFormService {
    constructor(private apollo: Apollo) { }

    getFinalPerformanceOverall(
        params: IEvaluationFormParams
    ): Observable<IFinalPerformanceOverallApiResponse> {
        return this.apollo
            .watchQuery<IFinalPerformanceOverallApiResponse>({
                query: GET_FINAL_OVERALL,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getFinalCategoryRating(
        params: IEvaluationFormParams
    ): Observable<IFinalCategoryRatingApiResponse> {
        return this.apollo
            .watchQuery<IFinalCategoryRatingApiResponse>({
                query: GET_FINAL_CATEGORY_RATING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getFinalQuestionRating(
        params: IEvaluationFormParams
    ): Observable<IFinalQuestionRatingApiResponse> {
        return this.apollo
            .watchQuery<IFinalQuestionRatingApiResponse>({
                query: GET_FINAL_QUESTION_RATING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getEmployeeFeedback(
        params: IEvaluationFormParams
    ): Observable<IEmployeeFeedbackApiResponse> {
        return this.apollo
            .watchQuery<IEmployeeFeedbackApiResponse>({
                query: GET_EMPLOYEE_FEEDBACK,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}