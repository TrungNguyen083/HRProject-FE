import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { IEvaluateCyclesApiResponse } from "../../hr-dashboard/models/hr-dashboard.model";
import { map, Observable } from "rxjs";
import { GET_EVALUATE_CYCLES } from "../../hr-dashboard/constants/hr-dashboard.constants";

@Injectable({
    providedIn: 'root',
})
export class HrEvaluationOverviewService {
    constructor(private apollo: Apollo) { }

    getEvaluateCycles(): Observable<IEvaluateCyclesApiResponse> {
        return this.apollo
            .watchQuery<IEvaluateCyclesApiResponse>({
                query: GET_EVALUATE_CYCLES,
            })
            .valueChanges.pipe(map(res => res.data));
    }
}