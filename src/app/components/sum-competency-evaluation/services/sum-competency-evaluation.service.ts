import { Apollo } from "apollo-angular";
import { IDepartmentIdApiResponse } from "../models/sum-competency-evaluation.model";
import { map, Observable } from "rxjs";
import { GET_DEPARTMENT_ID, GET_EVALUATE_CYCLES } from "../constants/sum-competency-evaluation.constant";
import { IEvaluateCyclesApiResponse } from "../../hr-dashboard/models/hr-dashboard.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SumCompetencyEvaluationService {
    constructor(private apollo: Apollo) { }

    getDepartmentId(email: string): Observable<IDepartmentIdApiResponse> {
        return this.apollo
            .watchQuery<IDepartmentIdApiResponse>({
                query: GET_DEPARTMENT_ID,
                variables: { email },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getEvaluateCycles(): Observable<IEvaluateCyclesApiResponse> {
        return this.apollo
            .watchQuery<IEvaluateCyclesApiResponse>({
                query: GET_EVALUATE_CYCLES,
            })
            .valueChanges.pipe(map(res => res.data));
    }
}