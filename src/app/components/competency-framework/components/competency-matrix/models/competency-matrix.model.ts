export interface ICompetencyTree {
    data: ICompetencyGroup,
    children?: ICompetency[]
}

export interface ICompetencyTreeApiResponse {
    competencyMatrixTree: ICompetencyTree[];
}

export interface ICompetencyGroupInput {
    competencyGroupName: string
    description: string
}

export interface ICompetencyInput {
    competencyName: string
    description: string
    competencyGroupId: number
}

export interface ICompetencyGroup {
    id: number
    competencyGroupName: string
    description: string
}

export interface ICompetency {
    id: number
    competencyName: string
    description: string
    competencyGroup: ICompetencyGroup
}

export interface ICompetencyGroupApiResponse {
    competencyGroups: ICompetencyGroup[]
}