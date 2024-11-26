import { PaginatedData } from "src/app/models/global.model"

export interface IPromotion {
    employeeId: number
    profileImage: string
    firstName: string
    lastName: string
    currentPositionLevel: string
    promotePositionLevel: string
    status: string
}

export interface IPromotionParams {
    cycleId: number
    name?: string;
    pageNo?: number;
    pageSize?: number;
}

export interface IPromotionPagingApiResponse {
    promotionList: PaginatedData<IPromotion>;
}