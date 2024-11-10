import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { IEvaluationFormParams, IPerformanceEvaluationInput } from "../../self-evaluation-form/models/self-evaluation-form.model";
import { map, Observable } from "rxjs";
import { IManagerCategoryRatingApiResponse, IManagerPerformanceOverallApiResponse, IManagerQuestionRatingApiResponse } from "../models/manager-evaluation-form.model";
import { CREATE_MANAGER_EVALUATION, GET_MANAGER_CATEGORY_RATING, GET_MANAGER_OVERALL, GET_MANAGER_QUESTION_RATING } from "../constants/manager-evaluation-form.constant";
import { IEmployeeFeedbackApiResponse } from "src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model";
import { GET_EMPLOYEE_FEEDBACK } from "src/app/components/competency-evaluation/components/manager-evaluation-form/constants/manager-evaluation-form.constant";

@Injectable({
    providedIn: 'root',
})
export class ManagerEvaluationFormService {
    constructor(private apollo: Apollo) { }

    getManagerPerformanceOverall(
        params: IEvaluationFormParams
    ): Observable<IManagerPerformanceOverallApiResponse> {
        return this.apollo
            .watchQuery<IManagerPerformanceOverallApiResponse>({
                query: GET_MANAGER_OVERALL,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getManagerCategoryRating(
        params: IEvaluationFormParams
    ): Observable<IManagerCategoryRatingApiResponse> {
        return this.apollo
            .watchQuery<IManagerCategoryRatingApiResponse>({
                query: GET_MANAGER_CATEGORY_RATING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getManagerQuestionRating(
        params: IEvaluationFormParams
    ): Observable<IManagerQuestionRatingApiResponse> {
        return this.apollo
            .watchQuery<IManagerQuestionRatingApiResponse>({
                query: GET_MANAGER_QUESTION_RATING,
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

    createSelfEvaluation(
        input: IPerformanceEvaluationInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_MANAGER_EVALUATION,
            variables: { input: input },
        })
    }
}