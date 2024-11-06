import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { IEmployeeIdApiResponse, IEvaluateCyclesApiResponse } from "../models/competency-evaluation.model";
import { map, Observable } from "rxjs";
import { GET_EMPLOYEE_ID, GET_EVALUATE_CYCLES } from "../constants/competency-evaluation.constant";

@Injectable({
    providedIn: 'root',
})

export class CompetencyEvaluationService {
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