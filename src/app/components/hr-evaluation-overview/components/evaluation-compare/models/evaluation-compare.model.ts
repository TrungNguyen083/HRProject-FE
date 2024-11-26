
export interface ICompareGoal {
    firstName: string
    lastName: string
    goals: IGoal[]
}

export interface IGoal {
    goalName: string;
    goalProgress: number;
}

export interface ICompareOverall {
    profileImage: string
    firstName: string
    lastName: string
    currentPosition: string
    targetPosition: string
}

export interface IChartData {
    labels: string[];
    datasets: {
        label: string;
        dataset: number[];
    }[];
}

export interface ICompareParams {
    employeeIds: number[]
    cycleId: number
}

export interface ICompareOverviewApiResponse {
    compareOverviews: ICompareOverall[]
}

export interface ICompareCompetencyRadarChartApiResponse {
    compareCompetencyRadarChart: IChartData
}

export interface ICompareGoalApiResponse {
    compareGoals: ICompareGoal[]
}

export interface ICompareGoalPieChartApiResponse {
    compareGoalPieChart: IChartData
}

export interface IComparePerformanceChartApiResponse {
    comparePerformanceChart: IChartData
}