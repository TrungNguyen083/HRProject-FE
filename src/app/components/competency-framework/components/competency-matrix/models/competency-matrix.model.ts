export interface ICompetencyTree {
    data: string,
    children?: string[]
}

export interface ICompetencyTreeApiResponse {
    competencyMatrixTree: ICompetencyTree[];
}