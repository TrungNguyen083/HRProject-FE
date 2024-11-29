import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { IPromotionPagingApiResponse, IPromotionParams } from "../models/evaluation-promotion.model";
import { map, Observable } from "rxjs";
import { GET_PROMOTION_PAGING, UPDATE_PROMOTION_REQUEST } from "../constants/evaluation-promotion.constant";

@Injectable({
    providedIn: 'root',
})
export class EvaluationPromotionService {
    constructor(private apollo: Apollo) { }

    getPromotionList(
        params: IPromotionParams
    ): Observable<IPromotionPagingApiResponse> {
        return this.apollo
            .watchQuery<IPromotionPagingApiResponse>({
                query: GET_PROMOTION_PAGING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }

    updatePromotionRequest(
        employeeId: number,
        cycleId: number,
        isApprove: boolean,
        comment: string,
    ): Observable<MutationResult<boolean>> {
        return this.apollo.mutate<boolean>({
            mutation: UPDATE_PROMOTION_REQUEST,
            variables: { employeeId, cycleId, isApprove, comment },
        })
    }
}