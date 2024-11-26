import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { IPromotionPagingApiResponse, IPromotionParams } from "../models/evaluation-promotion.model";
import { map, Observable } from "rxjs";
import { GET_PROMOTION_PAGING } from "../constants/evaluation-promotion.constant";

@Injectable({
    providedIn: 'root',
})
export class EvaluationPromotionService {
    constructor(private apollo: Apollo) { }
    
    getPromotionList(
        params: IPromotionParams
    ):
        Observable<IPromotionPagingApiResponse> {
        return this.apollo
            .watchQuery<IPromotionPagingApiResponse>({
                query: GET_PROMOTION_PAGING,
                variables: { ...params },
            })
            .valueChanges.pipe(map(res => res.data));
    }
}