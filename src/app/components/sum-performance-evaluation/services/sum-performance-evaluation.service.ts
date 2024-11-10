import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, map } from "rxjs";
import { GET_DEPARTMENT_ID, GET_EVALUATE_CYCLES } from "../constants/sum-performance-evaluation.constant";
import { IDepartmentIdApiResponse } from "../models/sum-performance-evaluation.model";
import { IEvaluateCyclesApiResponse } from "../../hr-dashboard/models/hr-dashboard.model";

@Injectable({
    providedIn: 'root',
})
export class SumPerformanceEvaluationService {
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