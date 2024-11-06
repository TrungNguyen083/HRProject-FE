export interface ICompetencyForm {
    competency: ICompetency,
    skills: ISkill[],
    competencyGroupId: number,
}

export interface ICompetency {
    id: number
    competencyName: string
    comment: string
    rating: number
}

export interface ISkill {
    id: number
    skillName: string
}

export interface ICompetencyGroup {
    id: number
    competencyGroupName: string
    weight: number
    rating: number
}

export interface IEvaluationFormParams {
    employeeId: number
    cycleId: number
}

export interface ICompetencyOverall {
    employeeId: number
    evaluationCycleName: string
    firstName: string
    lastName: string
    profileImage: string
    position: string
    level: string
    rating: number
    status: string
    isSubmit: boolean
}

export interface ICompetencyOverallApiResponse {
    competencyOverall: ICompetencyOverall
}

export interface ICompetencyFormApiResponse {
    competencyEvaluationForm: ICompetencyForm[]
}

export interface ICompetencyGroupApiResponse {
    competencyGroupRating: ICompetencyGroup[]
}

export interface ICompetencyEvaluationInput {
    employeeId: number
    cycleId: number
    isSubmit: boolean
    competencyRating: ICompetencySubmit[]
}

export interface ICompetencySubmit {
    competencyId: number
    comment: string
    rating: number
}