import { gql } from "apollo-angular";

export const GET_COMPARE_OVERVIEW = gql`
  query GetCompareOverview($employeeIds: [Int!], $cycleId: Int!) {
    compareOverviews(employeeIds: $employeeIds, cycleId: $cycleId) {
        profileImage
        firstName
        lastName
        currentPosition
        targetPosition
    }
  }
`;

export const GET_COMPARE_RADAR_CHART = gql`
  query GetCompareRadarChart($employeeIds: [Int!], $cycleId: Int!) {
    compareCompetencyRadarChart(employeeIds: $employeeIds, cycleId: $cycleId) {
        labels
        datasets {
            label
            dataset
        }
    }
  }
`;

export const GET_COMPARE_GOAL = gql`
query GetCompareGoal($employeeIds: [Int!], $cycleId: Int!) {
  compareGoals(employeeIds: $employeeIds, cycleId: $cycleId) {
      firstName
      lastName
      goals {
        goalName
        goalProgress
      }
  }
}
`;

export const GET_COMPARE_PIE_CHART = gql`
  query GetComparePieChart($employeeIds: [Int!], $cycleId: Int!) {
    compareGoalPieChart(employeeIds: $employeeIds, cycleId: $cycleId) {
        labels
        datasets {
            label
            dataset
        }
    }
  }
`;

export const GET_COMPARE_PERFORMANCE_CHART = gql`
  query GetComparePerformanceChart($employeeIds: [Int!]) {
    comparePerformanceChart(employeeIds: $employeeIds) {
        labels
        datasets {
            label
            dataset
        }
    }
  }
`;