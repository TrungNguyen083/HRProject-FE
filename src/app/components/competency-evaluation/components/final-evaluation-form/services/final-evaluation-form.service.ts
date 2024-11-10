import { Apollo, MutationResult } from "apollo-angular";
import { ICompetencyEvaluationInput, IEvaluationFormParams } from "../../evaluation-form/models/evaluation-form.model";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GET_FINAL_COMPETENCY_OVERALL, GET_FINAL_COMPETENCY_FORM, GET_FINAL_COMPETENCY_GROUP } from "../constants/final-evaluation-form.constant";
import { IFinalCompetencyOverallApiResponse, IFinalCompetencyFormApiResponse, IFinalCompetencyGroupApiResponse } from "../models/final-evaluation-form.model";
import { IEmployeeFeedbackApiResponse } from "../../manager-evaluation-form/models/manager-evaluation-form.model";
import { CREATE_MANAGER_EVALUATION, GET_EMPLOYEE_FEEDBACK } from "../../manager-evaluation-form/constants/manager-evaluation-form.constant";

@Injectable({
    providedIn: 'root',
})
export class FinalEvaluationFormService {
    constructor(private apollo: Apollo) { }

    getFinalCompetencyOverall(
        params: IEvaluationFormParams
    ): Observable<IFinalCompetencyOverallApiResponse> {
        return this.apollo
        .watchQuery<IFinalCompetencyOverallApiResponse>({
            query: GET_FINAL_COMPETENCY_OVERALL,
            variables: { ...params },
        })
        .valueChanges.pipe(map(res => res.data));
    }

    getFinalCompetencyForm(
        params: IEvaluationFormParams
    ): Observable<IFinalCompetencyFormApiResponse> {
        return this.apollo
        .watchQuery<IFinalCompetencyFormApiResponse>({
            query: GET_FINAL_COMPETENCY_FORM,
            variables: { ...params },
        })
        .valueChanges.pipe(map(res => res.data));
    }

    getFinalCompetencyGroup(
        params: IEvaluationFormParams
    ): Observable<IFinalCompetencyGroupApiResponse> {
        return this.apollo
        .watchQuery<IFinalCompetencyGroupApiResponse>({
            query: GET_FINAL_COMPETENCY_GROUP,
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

    createFinalEvaluation(
        input: ICompetencyEvaluationInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_MANAGER_EVALUATION,
            variables: { input: input },
        })
    }
}