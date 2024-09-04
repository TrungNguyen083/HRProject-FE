

export interface IDataItemDTO {
    label: string
    value: number
}

export interface IBarChartDTO {
    title: string
    items: IDataItemDTO[]
}

export interface IDiffPercentDTO {
    first: number
    second: number
    diffPercent: number
    isIncreased: boolean
}

export interface IPercentageChangeDTO {
    data: number
    diffPercent: number
    isIncreased: Boolean
}

export interface IHrOverviewParams {
    departmentId?: number
    cycleId: number
}

export interface ICompetencyOverviewChartApiResponse {
    competencyOverviewChart: IBarChartDTO
}

export interface ICompetencyDiffPercentApiResponse {
    competencyDiffPercent: IDiffPercentDTO
}

export interface IPerformanceOverviewChartApiResponse {
    performanceOverviewChart: IBarChartDTO
}

export interface IPerformaceDiffPercentApiResponse {
    performanceDiffPercent: IDiffPercentDTO
}

export interface ICurrentHeadCountApiResponse {
    currentHeadcounts: IPercentageChangeDTO
}

export interface IHeadCountChartApiRespone {
    headcountChart: IBarChartDTO
}

