import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/models/global.model';

export const topSkillsTableCol: TableHeader[] = [
  { col: 'No.', field: 'no' },
  { col: 'Score', field: 'score' },
  { col: 'Skills', field: 'skillName' },
];
export const defaultTable = {
  pagination: {
    pageNo: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  },
  data: [],
};
export const GET_EMPLOYEE_HIGHEST_SKILL = gql`
  query GetHighestSkill($employeeId: Int!, $pageNo: Int, $pageSize: Int, $evaluateCycleId: Int) {
    topSkill(
      employeeId: $employeeId
      pageNo: $pageNo
      pageSize: $pageSize
      evaluateCycleId: $evaluateCycleId
    ) {
      data {
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

export const GET_EMPLOYEE_IMPROVE_SKILL = gql`
  query GetImproveSkill($employeeId: Int!, $pageNo: Int, $pageSize: Int) {
    topKeenSkillEmployee(
      employeeId: $employeeId
      pageNo: $pageNo
      pageSize: $pageSize
    ) {
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

export const GET_EMPLOYEE_TARGET_SKILL = gql`
  query GetTargetSkill($employeeId: Int!, $pageNo: Int, $pageSize: Int, $evaluateCycleId: Int!) {
    topHighestSkillTargetEmployee(
      employeeId: $employeeId
      pageNo: $pageNo
      pageSize: $pageSize
      evaluateCycleId: $evaluateCycleId
    ) {
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

export const GET_EMPLOYEE_SKILL_GAP_BAR_CHART = gql`
  query GetSkillGapBarChart($employeeId: Int!, $cycleId: Int!) {
    skillGapBarChart(employeeId: $employeeId, cycleId: $cycleId) {
      title
      items {
        label
        value
      }
    }
  }
`;

export const GET_EMPLOYEE_COMPETENCY_PIE_CHART = gql`
  query GetCompetencyPieChart($employeeId: Int!, $cycleId: Int!) {
    competencyPieChart(employeeId: $employeeId, cycleId: $cycleId) {
      labels
      datasets
    }
  }
`;

export const GET_EMPLOYEE_PERFORMANCE_RATING = gql`
  query GetEmployeePerformanceRating($employeeId: Int!) {
    employeePerformanceRatingScore(employeeId: $employeeId) {
      data {
        label
        value
      }
    }
  }
`;

export const GET_OVERALL_COMPETENCY_RADAR_CHART = gql`
  query GetOverallCompetencyRadarChart($employeeId: Int!, $evaluateCycleId: Int!) {
    overallCompetencyRadarChart(employeeId: $employeeId, evaluateCycleId: $evaluateCycleId) {
      datasets {
        lineName
        dataset
      }
      labels
    }
  }
`;
