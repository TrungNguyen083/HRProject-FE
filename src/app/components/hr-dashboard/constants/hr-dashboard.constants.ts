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
  { col: 'Employee', field: 'employee' },
];
export const topCompetenciesTableCol: TableHeader[] = [
  { col: 'No.', field: 'no' },
  { col: 'Rating', field: 'rating' },
  { col: 'Employee', field: 'employee' },
];

export const GET_TOP_PERFORMERS = gql`
  query GetTopPerformers($pageNo: Int, $pageSize: Int) {
    employeesPerformance(pageNo: $pageNo, pageSize: $pageSize) {
      data {
        employee {
          firstName
          lastName
        }
        finalAssessment
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

export const GET_COMPETENCY_CYCLE_STATUS = gql`
  query GetCompetencyCycleStatus($competencyCycleId: Int!) {
    departmentInComplete(competencyCycleId: $competencyCycleId) {
      department {
        departmentName
      }
      employeePercentage
      evaluatorPercentage
    }

    companyInComplete(competencyCycleId: $competencyCycleId) {
      label
      data
    }
  }
`;

export const GET_COMPETENCY_BY_LEVEL_AND_POSITION = gql`
  query GetCmptByLevelAndPosition($positionId: Int!, $competencyCycleId: Int!) {
    avgCompetencyScore(
      positionId: $positionId
      competencyCycleId: $competencyCycleId
    ) {
      jobLevel {
        jobLevelName
      }
      competency {
        competencyName
      }
      average
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
        datasets
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
  query GetTopSkillset($competencyCycleId: Int!) {
    topHighestSkillSet(competencyCycleId: $competencyCycleId) {
      data {
        skillSet {
          skillSetName
        }
        proficiencyLevel {
          score
        }
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
  query GetTopCompetencies($pageNo: Int!, $pageSize: Int!) {
    employeesCompetency(pageNo: $pageNo, pageSize: $pageSize) {
      data {
        employee {
          lastName
          firstName
        }
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
  query GetPotentialPerformance($departmentId: Int) {
    employeesPotentialPerformance(departmentId: $departmentId) {
      employee {
        lastName
        firstName
      }
      profileImgUri
      potential
      performance
    }
  }
`;

export const GET_PERFORMANCE_BY_JOB_LEVEL = gql`
  query GetPerformanceByJobLevel($performanceCycleId: Int!, $positionId: Int!) {
    performanceByJobLevel(performanceCycleId: $performanceCycleId , positionId: $positionId) {
      labels {
        jobLevelName
      }
      datasets
      categories
    }
  }
`