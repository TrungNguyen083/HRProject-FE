import { Apollo, MutationResult } from "apollo-angular";
import { ICompetencyEvaluationInput, IEvaluationFormParams } from "../../evaluation-form/models/evaluation-form.model";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IEmployeeFeedbackApiResponse, IManagerCompetencyFormApiResponse, IManagerCompetencyGroupApiResponse, IManagerCompetencyOverallApiResponse } from "../models/manager-evaluation-form.model";
import { CREATE_MANAGER_EVALUATION, GET_EMPLOYEE_FEEDBACK, GET_MANAGER_COMPETENCY_FORM, GET_MANAGER_COMPETENCY_GROUP, GET_MANAGER_COMPETENCY_OVERALL } from "../constants/manager-evaluation-form.constant";

@Injectable({
    providedIn: 'root',
})
export class ManagerEvaluationFormService {
    constructor(private apollo: Apollo) { }

    getManagerCompetencyOverall(
        params: IEvaluationFormParams
    ): Observable<IManagerCompetencyOverallApiResponse> {
        return this.apollo
            .watchQuery<IManagerCompetencyOverallApiResponse>({
                query: GET_MANAGER_COMPETENCY_OVERALL,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getManagerCompetencyForm(
        params: IEvaluationFormParams
    ): Observable<IManagerCompetencyFormApiResponse> {
        return this.apollo
            .watchQuery<IManagerCompetencyFormApiResponse>({
                query: GET_MANAGER_COMPETENCY_FORM,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getManagerCompetencyGroup(
        params: IEvaluationFormParams
    ): Observable<IManagerCompetencyGroupApiResponse> {
        return this.apollo
            .watchQuery<IManagerCompetencyGroupApiResponse>({
                query: GET_MANAGER_COMPETENCY_GROUP,
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

    createManagerEvaluation(
        input: ICompetencyEvaluationInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_MANAGER_EVALUATION,
            variables: { input: input },
        })
    }
}