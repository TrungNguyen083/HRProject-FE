export interface ICycleOverall {
    name: string;
    status: string;
    startDate: string;
    dueDate: string;
    completedEvaluate: IPieChart
    competencyOverall: IPieChart
    performanceOverall: IPieChart
}

export interface IPieChart {
    labels: string[];
    datasets: number[];
}

export interface IEvaluationCycleOverallApiResponse {
    cyclesOverall: ICycleOverall[];
}