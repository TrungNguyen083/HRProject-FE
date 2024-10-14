import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ICompetencyTreeApiResponse } from "../models/competency-matrix.model";
import { map, Observable } from "rxjs";
import { GET_COMPETENCY_TREE } from "../constants/competency-matrix.constant";

@Injectable({
    providedIn: 'root',
})
export class CompetencyMatrixService {
    
    constructor(private apollo: Apollo) { }

    getCompetencyTree(): Observable<ICompetencyTreeApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyTreeApiResponse>({
                query: GET_COMPETENCY_TREE,
            })
            .valueChanges.pipe(map(res => res.data));
    }
}