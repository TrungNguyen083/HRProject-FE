import { IHeatMapDTO } from "src/app/components/sum-dashboard/models/sum-dashboard.model"

export interface IPositionLevel {
    positionId: number,
    positionLevelName: string,
    skillNo: number,
}

export interface IPositionLevelApiResponse {
    positionOption: IPositionLevel[]
}

export interface ICompetencyBaselineApiResponse {
    competencyBaseLine: IHeatMapDTO[]
}