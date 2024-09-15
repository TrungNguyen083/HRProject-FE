export interface IProficiencyLevel {
    id: number
    proficiencyLevelDescription: string
    proficiencyLevelName: string
    score: number
}

export interface IProficiencyLevelApiResponse {
    proficiencyLevels: IProficiencyLevel[];
}

export interface IPerformanceRange {
    id: number
    text: string
    description: string
    minValue: number
    maxValue: number
    order: number
}

export interface IPerformanceRangeApiResponse {
    performanceRanges: IPerformanceRange[];
}