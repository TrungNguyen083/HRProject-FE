import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { GET_EMPLOYEE_ID, GET_EVALUATE_CYCLES } from "../constants/performance-evaluation.model";
import { IEmployeeIdApiResponse, IEvaluateCyclesApiResponse } from "../models/performance-evaluation.model";

@Injectable({
    providedIn: 'root',
})

export class PerformanceEvaluationService {
    constructor(private apollo: Apollo) { }

    getEvaluateCycles(): Observable<IEvaluateCyclesApiResponse> {
        return this.apollo
            .watchQuery<IEvaluateCyclesApiResponse>({
                query: GET_EVALUATE_CYCLES,
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getEmployeeId(email: string): Observable<IEmployeeIdApiResponse> {
        return this.apollo
            .watchQuery<IEmployeeIdApiResponse>({
                query: GET_EMPLOYEE_ID,
                variables: { email },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}