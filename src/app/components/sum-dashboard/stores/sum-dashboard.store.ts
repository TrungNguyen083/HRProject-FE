import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SumDashboardService } from "../services/sum-dashboard.service";
import { Observable, switchMap } from "rxjs";
import { IBarChartDTO, ICompetency, ICompetencyGapRadarChartParams, ICycleDepartmentParams, IDepartmentEmployee, IDiffPercentDTO, IEmployeePotentialPerformanceDTO, IEvaluateCycle, IGoalProgress, IHeatMapDTO, IHeatMapSkillLevelParams, IMultiBarChartDTO, IPieChartDTO, IRadarChartDTO, IReviewStatus, ITopReview, ITopReviewParams, ITopSkill, ITopSkillParams } from "../models/sum-dashboard.model";
import { PaginatedData } from "src/app/models/global.model";
import { IPercentageChangeDTO } from "../../hr-dashboard/components/hr-overview/models/hr-overview.model";

interface SumDashboardState {
  evaluateCycles: IEvaluateCycle[];
  previousCycle: number | null;
  currentCycle: number | null;
  departmentId: number | null;
  competencyReviewProgress: {
    completedEvaluationByPosition: IMultiBarChartDTO;
    competencyEvaluationProgressPieChart: IPieChartDTO;
  }
  performanceReviewProgress: {
    completedPerformEvaluationByPosition: IMultiBarChartDTO;
    performanceEvaluationProgressPieChart: IPieChartDTO;
  }
  competencyReviewStatus: IReviewStatus[];
  performanceReviewStatus: IReviewStatus[];
  employeesInDepartment: IDepartmentEmployee[];
  departmentCompetencyGap: IRadarChartDTO;
  competencies: ICompetency[];
  departmentSkillHeatMap: IHeatMapDTO[];
  topSkills: PaginatedData<ITopSkill>;
  topCompetencies: PaginatedData<ITopReview>;
  topPerformers: PaginatedData<ITopReview>;
  departmentPotentialAndPerformance: IEmployeePotentialPerformanceDTO[];
  competencyOverviewChart: IBarChartDTO | null;
  competencyDiffPercent: IDiffPercentDTO | null;
  performanceOverviewChart: IBarChartDTO | null;
  performanceDiffPercent: IDiffPercentDTO | null;
  departmentHeadcount: IPercentageChangeDTO | null;
  departmentHeadcountChart: IBarChartDTO | null;
  departmentGoalProgress: IGoalProgress[];
}

const defaultPagination = {
  pageNo: 0,
  pageSize: 0,
  totalItems: 0,
  totalPages: 0,
};

@Injectable({
  providedIn: 'root',
})
export class SumDashboardStore extends ComponentStore<SumDashboardState> {
  constructor(private sumDashboardService: SumDashboardService) {
    super({
      evaluateCycles: [],
      previousCycle: null,
      currentCycle: null,
      departmentId: null,
      competencyReviewProgress: {
        completedEvaluationByPosition: {
          labels: [],
          datasets: [],
        },
        competencyEvaluationProgressPieChart: {
          labels: [],
          datasets: [],
        },
      },
      performanceReviewProgress: {
        completedPerformEvaluationByPosition: {
          labels: [],
          datasets: [],
        },
        performanceEvaluationProgressPieChart: {
          labels: [],
          datasets: [],
        },
      },
      competencyReviewStatus: [],
      performanceReviewStatus: [],
      employeesInDepartment: [],
      departmentCompetencyGap: {
        labels: [],
        datasets: []
      },
      competencies: [],
      departmentSkillHeatMap: [],
      topSkills: {
        pagination: {
          ...defaultPagination,
        },
        data: [],
      },
      topCompetencies: {
        pagination: {
          ...defaultPagination,
        },
        data: [],
      },
      topPerformers: {
        pagination: {
          ...defaultPagination,
        },
        data: [],
      },
      departmentPotentialAndPerformance: [],
      competencyOverviewChart: null,
      competencyDiffPercent: null,
      performanceOverviewChart: null,
      performanceDiffPercent: null,
      departmentHeadcount: null,
      departmentHeadcountChart: null,
      departmentGoalProgress: []
    });
  }

  readonly evaluateCycles$ = this.select(state => state.evaluateCycles);
  readonly previousCycle$ = this.select(state => state.previousCycle);
  readonly currentCycle$ = this.select(state => state.currentCycle);
  readonly departmentId$ = this.select(state => state.departmentId);
  readonly competencyReviewProgress$ = this.select(state => state.competencyReviewProgress);
  readonly performanceReviewProgress$ = this.select(state => state.performanceReviewProgress);
  readonly competencyReviewStatus$ = this.select(state => state.competencyReviewStatus);
  readonly performanceReviewStatus$ = this.select(state => state.performanceReviewStatus);
  readonly employeesInDepartment$ = this.select(state => state.employeesInDepartment);
  readonly departmentCompetencyGap$ = this.select(state => state.departmentCompetencyGap);
  readonly competencies$ = this.select(state => state.competencies);
  readonly departmentSkillHeatMap$ = this.select(state => state.departmentSkillHeatMap);
  readonly topSkills$ = this.select(state => state.topSkills);
  readonly topCompetencies$ = this.select(state => state.topCompetencies);
  readonly topPerformers$ = this.select(state => state.topPerformers);
  readonly departmentPotentialAndPerformance$ = this.select(state => state.departmentPotentialAndPerformance);
  readonly competencyOverviewChart$ = this.select(state => state.competencyOverviewChart);
  readonly competencyDiffPercent$ = this.select(state => state.competencyDiffPercent);
  readonly performanceOverviewChart$ = this.select(state => state.performanceOverviewChart);
  readonly performanceDiffPercent$ = this.select(state => state.performanceDiffPercent);
  readonly departmentHeadcount$ = this.select(state => state.departmentHeadcount);
  readonly departmentHeadcountChart$ = this.select(state => state.departmentHeadcountChart);
  readonly departmentGoalProgress$ = this.select(state => state.departmentGoalProgress);



  //UPDATER


  readonly setEvaluateCycles = this.updater(
    (state: SumDashboardState, evaluateCycles: IEvaluateCycle[]) => {
      return { ...state, evaluateCycles };
    },
  );

  readonly setPreviousCycle = this.updater(
    (state: SumDashboardState, previousCycle: number | null) => {
      return { ...state, previousCycle: previousCycle };
    },
  );

  readonly setCurrentCycle = this.updater(
    (state: SumDashboardState, currentCycle: number | null) => {
      return { ...state, currentCycle: currentCycle };
    },
  );

  readonly setDepartmentId = this.updater(
    (state: SumDashboardState, departmentId: number | null) => {
      return { ...state, departmentId: departmentId };
    },
  );

  readonly setCompetencyReviewProgress = this.updater(
    (
      state: SumDashboardState,
      competencyReviewProgress: {
        completedEvaluationByPosition: IMultiBarChartDTO;
        competencyEvaluationProgressPieChart: IPieChartDTO;
      },
    ) => {
      return {
        ...state,
        competencyReviewProgress,
      };
    },
  );

  readonly setPerformanceReviewProgress = this.updater(
    (
      state: SumDashboardState,
      performanceReviewProgress: {
        completedPerformEvaluationByPosition: IMultiBarChartDTO;
        performanceEvaluationProgressPieChart: IPieChartDTO;
      },
    ) => {
      return {
        ...state,
        performanceReviewProgress,
      };
    },
  );

  readonly setCompetencyReviewStatus = this.updater(
    (state: SumDashboardState, competencyReviewStatus: IReviewStatus[]) => {
      return { ...state, competencyReviewStatus: competencyReviewStatus };
    },
  );

  readonly setPerformanceReviewStatus = this.updater(
    (state: SumDashboardState, performanceReviewStatus: IReviewStatus[]) => {
      return { ...state, performanceReviewStatus: performanceReviewStatus };
    },
  );

  readonly setDepartmentEmployee = this.updater(
    (state: SumDashboardState, employeesInDepartment: IDepartmentEmployee[]) => {
      return { ...state, employeesInDepartment: employeesInDepartment };
    },
  );

  readonly setCompetencyGapRadarChart = this.updater(
    (state: SumDashboardState, departmentCompetencyGap: IRadarChartDTO) => {
      return { ...state, departmentCompetencyGap: departmentCompetencyGap };
    },
  );

  readonly setCompetencies = this.updater(
    (state: SumDashboardState, competencies: ICompetency[]) => {
      return { ...state, competencies: competencies };
    },
  );

  readonly setHeatMapSkillLevel = this.updater(
    (state: SumDashboardState, departmentSkillHeatMap: IHeatMapDTO[]) => {
      return { ...state, departmentSkillHeatMap: departmentSkillHeatMap };
    },
  );

  readonly setTopSkills = this.updater(
    (state: SumDashboardState, topSkillsets: PaginatedData<ITopSkill>) => {
      return {
        ...state,
        topSkills: topSkillsets,
      };
    },
  );

  readonly setTopCompetencies = this.updater(
    (
      state: SumDashboardState,
      topCompetencies: PaginatedData<ITopReview>,
    ) => {
      return {
        ...state,
        topCompetencies,
      };
    },
  );

  readonly setTopPerformers = this.updater(
    (state: SumDashboardState, topPerformers: PaginatedData<ITopReview>) => {
      return {
        ...state,
        topPerformers,
      };
    },
  );

  readonly setPotentialPerformance = this.updater(
    (state: SumDashboardState, departmentPotentialAndPerformance: IEmployeePotentialPerformanceDTO[]) => {
      return {
        ...state,
        departmentPotentialAndPerformance,
      };
    },
  );

  readonly setCompetencyOverview = this.updater(
    (state: SumDashboardState, competencyOverviewChart: IBarChartDTO) => {
      return {
        ...state,
        competencyOverviewChart,
      };
    },
  );

  readonly setPerformanceOverview = this.updater(
    (state: SumDashboardState, performanceOverviewChart: IBarChartDTO) => {
      return {
        ...state,
        performanceOverviewChart,
      };
    },
  );

  readonly setCompetencyDiff = this.updater(
    (state: SumDashboardState, competencyDiffPercent: IDiffPercentDTO) => {
      return {
        ...state,
        competencyDiffPercent,
      };
    },
  );

  readonly setPerformanceDiff = this.updater(
    (state: SumDashboardState, performanceDiffPercent: IDiffPercentDTO) => {
      return {
        ...state,
        performanceDiffPercent,
      };
    },
  );

  readonly setDepartmentHeadcount = this.updater(
    (state: SumDashboardState, departmentHeadcount: IPercentageChangeDTO) => {
      return {
        ...state,
        departmentHeadcount,
      };
    },
  );

  readonly setDepartmentHeadcountChart = this.updater(
    (state: SumDashboardState, departmentHeadcountChart: IBarChartDTO) => {
      return {
        ...state,
        departmentHeadcountChart,
      };
    },
  );

  readonly setDepartmentGoalProgress = this.updater(
    (state: SumDashboardState, departmentGoalProgress: IGoalProgress[]) => {
      return {
        ...state,
        departmentGoalProgress,
      };
    },
  );


  //EFFECT


  readonly getEvaluateCycles = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.sumDashboardService.getEvaluateCycles().pipe(
          tapResponse({
            next: res => this.setEvaluateCycles(res.evaluateCycles),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getDepartmentId = this.effect((params$: Observable<string>) =>
    params$.pipe(
      switchMap(params =>
        this.sumDashboardService.getDepartmentId(params).pipe(
          tapResponse({
            next: res => {
              this.setDepartmentId(res.departmentId);
            },
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getCompetencyReviewProgress = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getCompetencyReviewProgress(params).pipe(
            tapResponse({
              next: res => this.setCompetencyReviewProgress({
                completedEvaluationByPosition: res.completedEvaluationByPosition,
                competencyEvaluationProgressPieChart: res.competencyEvaluationProgressPieChart,
              }),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getPerformanceReviewProgress = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getPerformanceReviewProgress(params).pipe(
            tapResponse({
              next: res => this.setPerformanceReviewProgress({
                completedPerformEvaluationByPosition: res.completedPerformEvaluationByPosition,
                performanceEvaluationProgressPieChart: res.performanceEvaluationProgressPieChart,
              }),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getCompetencyReviewStatus = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getCompetencyReviewStatus(params).pipe(
            tapResponse({
              next: res => this.setCompetencyReviewStatus(res.competencyEvaluationStatus),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getPerformanceReviewStatus = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getPerformanceReviewStatus(params).pipe(
            tapResponse({
              next: res => this.setPerformanceReviewStatus(res.performanceEvaluationStatus),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getDepartmentEmployee = this.effect(
    (params$: Observable<number>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getDepartmentEmployee(params).pipe(
            tapResponse({
              next: res => this.setDepartmentEmployee(res.employeesInDepartment),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getCompetencyGapRadarChart = this.effect(
    (params$: Observable<ICompetencyGapRadarChartParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getCompetencyGapRadarChart(params).pipe(
            tapResponse({
              next: res => this.setCompetencyGapRadarChart(res.departmentCompetencyGap),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getCompetencies = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.sumDashboardService.getCompetencies().pipe(
          tapResponse({
            next: res => this.setCompetencies(res.competencies),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getHeatMapSkillLevel = this.effect(
    (params$: Observable<IHeatMapSkillLevelParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getHeatMapSkillLevel(params).pipe(
            tapResponse({
              next: res => this.setHeatMapSkillLevel(res.departmentSkillHeatMap),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getTopSkills = this.effect(
    (params$: Observable<ITopSkillParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getTopSkills(params).pipe(
            tapResponse({
              next: res => {
                this.setTopSkills(res.topSkill)
              },
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getTopCompetencies = this.effect(
    (params$: Observable<ITopReviewParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getTopCompetencies(params).pipe(
            tapResponse({
              next: res => {
                this.setTopCompetencies(res.topCompetencyRating);
              },
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getTopPerformers = this.effect(
    (params$: Observable<ITopReviewParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getTopPerformers(params).pipe(
            tapResponse({
              next: res => this.setTopPerformers(res.topPerformers),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getPotentialPerformance = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getPotentialPerformance(params).pipe(
            tapResponse({
              next: res => this.setPotentialPerformance(res.departmentPotentialAndPerformance),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getCompetencyOverview = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getCompetencyOverview(params).pipe(
            tapResponse({
              next: res => this.setCompetencyOverview(res.competencyOverviewChart),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getPerformanceOverview = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getPerformanceOverview(params).pipe(
            tapResponse({
              next: res => this.setPerformanceOverview(res.performanceOverviewChart),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getCompetencyDiff = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getCompetencyDiff(params).pipe(
            tapResponse({
              next: res => this.setCompetencyDiff(res.competencyDiffPercent),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getPerformanceDiff = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getPerformanceDiff(params).pipe(
            tapResponse({
              next: res => this.setPerformanceDiff(res.performanceDiffPercent),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getDepartmentHeadcount = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getDepartmentHeadcount(params).pipe(
            tapResponse({
              next: res => this.setDepartmentHeadcount(res.departmentHeadcount),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getDepartmentHeadcountChart = this.effect(
    (params$: Observable<number>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getDepartmentHeadcountChart(params).pipe(
            tapResponse({
              next: res => this.setDepartmentHeadcountChart(res.departmentHeadcountChart),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );

  readonly getDepartmentGoalProgress = this.effect(
    (params$: Observable<ICycleDepartmentParams>) =>
      params$.pipe(
        switchMap(params =>
          this.sumDashboardService.getDepartmentGoalProgress(params).pipe(
            tapResponse({
              next: res => this.setDepartmentGoalProgress(res.departmentGoalProgress),
              error: error => console.log(error),
            }),
          ),
        ),
      ),
  );
}