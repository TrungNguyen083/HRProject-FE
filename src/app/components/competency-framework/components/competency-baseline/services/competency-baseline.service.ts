import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { ICompetencyBaselineApiResponse, IPositionLevelApiResponse } from "../models/competency-baseline.model";
import { GET_COMPETENCY_BASELINE, GET_POSITION_LEVEL } from "../constants/competency-baseline.constant";

@Injectable({
    providedIn: 'root',
})
export class CompetencyBaselineService {
    constructor(private apollo: Apollo) { }

    getPositionOption(
        name: string
    ): Observable<IPositionLevelApiResponse> {
        return this.apollo
            .watchQuery<IPositionLevelApiResponse>({
                query: GET_POSITION_LEVEL,
                variables: { name },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    getCompetencyBaseline(
        positionId: number
    ): Observable<ICompetencyBaselineApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyBaselineApiResponse>({
                query: GET_COMPETENCY_BASELINE,
                variables: { positionId },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}