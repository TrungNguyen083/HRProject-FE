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

export const GET_COMPETENCY_CYCLE_STATUS = gql`
  query GetCompetencyCycleStatus($competencyCycleId: Int!) {
    departmentInCompleteComp(competencyCycleId: $competencyCycleId) {
      labels
      datasets{
        label
        data
      }
    }

    competencyEvalProgress(competencyCycleId: $competencyCycleId) {
      labels
      datasets
    }
  }
`;

export const GET_COMPETENCY_BY_LEVEL_AND_POSITION = gql`
  query GetCmptByLevelAndPosition($positionId: Int, $competencyCycleId: Int!) {
    avgCompetencyScore(
      positionId: $positionId
      competencyCycleId: $competencyCycleId
    ) {
      verticalColumnName
      horizontalColumnName
      score
    }
  }
`;

export const GET_COMPETENCY_BY_UNIT = gql`
  query GetCompetencyByUnit($competencyCyclesId: [Int]!, $departmentId: Int!) {
    competencyRadarChart(
      competencyCyclesId: $competencyCyclesId
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
  query GetTimeline($competencyCycleId: Int!) {
    competencyTimeLine(competencyCycleId: $competencyCycleId) {
      timeLineName
      startDate
      dueDate
      isDone
    }
  }
`;

export const GET_TOP_SKILL_SETS = gql`
  query GetTopSkillset($competencyCycleId: Int!, $pageNo: Int, $pageSize: Int) {
    topSkillSet(competencyCycleId: $competencyCycleId, pageNo: $pageNo, pageSize: $pageSize) {
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

export const GET_COMPETENCY_CYCLES = gql`
  query GetCompetencyCyles {
    competencyCycles {
      id
      competencyCycleName
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