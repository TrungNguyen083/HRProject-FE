import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/models/global.model';

export const topSkillsTableCol: TableHeader[] = [
  { col: 'No.', field: 'no' },
  { col: 'AVG Score', field: 'avgScore' },
  { col: 'Skill', field: 'skill' },
];
export const topPerformersTableCol: TableHeader[] = [
  { col: 'No.', field: 'no' },
  { col: 'Rating', field: 'rating' },
  { col: 'Employee', field: 'firstName' },
];
export const topCompetenciesTableCol: TableHeader[] = [
  { col: 'No.', field: 'no' },
  { col: 'Rating', field: 'rating' },
  { col: 'Employee', field: 'firstName' },
];

export const GET_DEPARTMENT_INCOMPLETE = gql`
  query GetDepartmentInComplete($evaluateCycleId: Int!) {
    departmentInCompleteComp(evaluateCycleId: $evaluateCycleId) {
      labels
      datasets{
        label
        data
      }
    }

    competencyEvalProgress(evaluateCycleId: $evaluateCycleId) {
      labels
      datasets
    }
  }
`;

export const GET_AVG_COMPETENCY_SCORE = gql`
  query GetAVGCompetencyScore($positionId: Int, $evaluateCycleId: Int!) {
    avgCompetencyScore(
      positionId: $positionId
      evaluateCycleId: $evaluateCycleId
    ) {
      verticalColumnName
      horizontalColumnName
      score
    }
  }
`;

export const GET_COMPETENCY_RADAR_CHART = gql`
  query GetCompetencyRadarChart($evaluateCycleIds: [Int]!, $departmentId: Int!) {
    competencyRadarChart(
      evaluateCycleIds: $evaluateCycleIds
      departmentId: $departmentId
    ) {
      labels
      datasets {
        lineName
        dataset
      }
    }
  }
`;

export const GET_COMPETENCY_TIMELINE = gql`
  query GetTimeline($evaluateCycleId: Int!) {
    evaluateTimeLine(evaluateCycleId: $evaluateCycleId) {
      timeLineName
      startDate
      dueDate
      isDone
    }
  }
`;

export const GET_TOP_SKILL_SETS = gql`
  query GetTopSkillset($evaluateCycleId: Int!, $pageNo: Int, $pageSize: Int) {
    topSkillSet(evaluateCycleId: $evaluateCycleId, pageNo: $pageNo, pageSize: $pageSize) {
      data{
        label
        value
      }
      pagination {
        pageNo
        pageSize
        totalItems
        totalPages
      }
    }
  }
`;


export const GET_TOP_PERFORMERS = gql`
  query GetTopPerformers($cycleId: Int!, $pageNo: Int, $pageSize: Int) {
    topPerformers(cycleId: $cycleId, pageNo: $pageNo, pageSize: $pageSize) {
      data {
        id
        firstName
        lastName
        profileImgUrl
        rating
      }
      pagination {
        pageNo
        pageSize
        totalItems
        totalPages
      }
    }
  }
`;

export const GET_TOP_COMPETENCIES = gql`
  query GetTopCompetencies($cycleId: Int!, $pageNo: Int!, $pageSize: Int!) {
    topCompetencyRating(cycleId: $cycleId, pageNo: $pageNo, pageSize: $pageSize) {
      data{
        id
        firstName
        lastName
        profileImgUrl
        rating
      }
      pagination {
        pageNo
        pageSize
        totalPages
        totalItems
      }
    }
  }
`;

export const GET_EVALUATE_CYCLES = gql`
  query GetEvaluateCycles {
    evaluateCycles {
      id
      evaluateCycleName
    }
  }
`;

export const GET_POTENTIAL_PERFORMANCE = gql`
  query GetPotentialPerformance($departmentId: Int, $cycleId: Int) {
    employeesPotentialPerformance(departmentId: $departmentId, cycleId: $cycleId) {
      employeeId
      fullName
      profileImgUri
      potential
      performance
    }
  }
`;

export const GET_PERFORMANCE_BY_JOB_LEVEL = gql`
  query GetPerformanceByJobLevel($positionId: Int!, $cycleId: Int!) {
    performanceByJobLevel(positionId: $positionId, cycleId: $cycleId) {
      labels {
        id
        jobLevelName
      }
      datasets {
        tag
        data
      }
    }
  } 
`