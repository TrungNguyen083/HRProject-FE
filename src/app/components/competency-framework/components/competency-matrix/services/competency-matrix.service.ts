import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { ICompetencyGroupApiResponse, ICompetencyGroupInput, ICompetencyInput, ICompetencyTreeApiResponse } from "../models/competency-matrix.model";
import { map, Observable } from "rxjs";
import { CREATE_COMPETENCY, CREATE_COMPETENCY_GROUP, DELETE_COMPETENCY, DELETE_COMPETENCY_GROUP, GET_COMPETENCY_GROUP, GET_COMPETENCY_TREE, UPDATE_COMPETENCY, UPDATE_COMPETENCY_GROUP } from "../constants/competency-matrix.constant";

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

    getCompetencyGroup(): Observable<ICompetencyGroupApiResponse> {
        return this.apollo
            .watchQuery<ICompetencyGroupApiResponse>({
                query: GET_COMPETENCY_GROUP,
            })
            .valueChanges.pipe(map(res => res.data));
    }

    createCompetencyGroup(
        input: ICompetencyGroupInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_COMPETENCY_GROUP,
            variables: { input: input },
        })
    }

    updateCompetencyGroup(
        id: number,
        input: ICompetencyGroupInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: UPDATE_COMPETENCY_GROUP,
            variables: { id: id, input: input },
        });
    }

    deleteCompetencyGroup(
        id: number,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: DELETE_COMPETENCY_GROUP,
            variables: { id: id },
        });
    }

    createCompetency(
        input: ICompetencyInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: CREATE_COMPETENCY,
            variables: { input: input },
        })
    }

    updateCompetency(
        id: number,
        input: ICompetencyInput,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: UPDATE_COMPETENCY,
            variables: { id: id, input: input },
        });
    }

    deleteCompetency(
        id: number,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: DELETE_COMPETENCY,
            variables: { id: id },
        });
    }
}