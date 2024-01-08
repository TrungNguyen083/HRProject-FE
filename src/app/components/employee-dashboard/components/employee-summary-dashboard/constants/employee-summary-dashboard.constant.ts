import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/models/global.model';

export const topSkillsetTableCol: TableHeader[] = [
  { col: 'No.', field: 'no' },
  { col: 'Score', field: 'score' },
  { col: 'Skill sets', field: 'skillsetName' },
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
  query GetHighestSkill($employeeId: Int!, $pageNo: Int, $pageSize: Int) {
    topSkillSet(
      employeeId: $employeeId
      pageNo: $pageNo
      pageSize: $pageSize
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
    topKeenSkillSetEmployee(
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
  query GetTargetSkill($employeeId: Int!, $pageNo: Int, $pageSize: Int) {
    topHighestSkillSetTargetEmployee(
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

export const GET_EMPLOYEE_AT_GLANCE = gql`
  query GetAtGlance($employeeId: Int!) {
    getAtGlance(employeeId: $employeeId) {
      skillGapTargetScore
      skillGapCurrentScore
      competencyLevelPercentage
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

export const GET_OVERALL_COMPETENCY_SCORE = gql`
  query GetOverallCompetencyScore($employeeId: Int!) {
    getOverallCompetencyScore(employeeId: $employeeId) {
      datasets {
        lineName
        datasets
      }
      labels
    }
  }
`;
