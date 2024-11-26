import { PaginatedData } from "src/app/models/global.model";
import { IPromotion, IPromotionParams } from "../models/evaluation-promotion.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { EvaluationPromotionService } from "../services/evaluation-promotion.service";
import { Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";

interface EvaluationPromotionState {
    promotionList: PaginatedData<IPromotion>;
}
@Injectable({
    providedIn: 'root',
})
export class EvaluationPromotionStore extends ComponentStore<EvaluationPromotionState> {
    constructor(private evaluationPromotionService: EvaluationPromotionService) {
        super({
            promotionList: {
                pagination: {
                    pageNo: 0,
                    pageSize: 0,
                    totalItems: 0,
                    totalPages: 0,
                },
                data: [],
            }
        })
    }

    readonly promotionList$ = this.select(state => state.promotionList);

    readonly setPromotionList = this.updater(
        (state: EvaluationPromotionState, promotionList: PaginatedData<IPromotion>) => {
            return { ...state, promotionList: promotionList };
        },
    );

    readonly getPromotionList = this.effect(
        (params$: Observable<IPromotionParams>) =>
            params$.pipe(
                switchMap(params =>
                    this.evaluationPromotionService.getPromotionList(params).pipe(
                        tapResponse({
                            next: res => this.setPromotionList(res.promotionList),
                            error: error => console.log(error),
                        }),
                    ),
                ),
            ),
    );
}