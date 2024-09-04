import { gql } from "apollo-angular";

export const GET_COMPETENCY_OVERVIEW_CHART = gql`
  query GetCompetencyOverviewChart($departmentId: Int, $cycleId: Int!) {
    competencyOverviewChart(
      departmentId: $departmentId
      cycleId: $cycleId
    ) {
      title
      items {
        label
        value
      }
    }
  }
`;

export const GET_PERFORMANCE_OVERVIEW_CHART = gql`
  query GetPerformanceOverviewChart($departmentId: Int, $cycleId: Int!) {
    performanceOverviewChart(
      departmentId: $departmentId
      cycleId: $cycleId
    ) {
      title
      items {
        label
        value
      }
    }
  }
`;

export const GET_COMPETENCY_DIFF_PERCENT = gql`
  query GetCompetencyDiffPercent($departmentId: Int, $cycleId: Int!) {
    competencyDiffPercent(
      departmentId: $departmentId
      cycleId: $cycleId
    ) {
      first
      second
      diffPercent
      isIncreased
    }
  }
`;

export const GET_PERFORMANCE_DIFF_PERCENT = gql`
  query GetPerformanceDiffPercent($departmentId: Int, $cycleId: Int!) {
    performanceDiffPercent(
      departmentId: $departmentId
      cycleId: $cycleId
    ) {
      first
      second
      diffPercent
      isIncreased
    }
  }
`;

export const GET_CURRENT_HEAD_COUNT = gql`
query GetCurrentHeadCount($cycleId: Int!) {
    currentHeadcounts(cycleId: $cycleId) {
      data
      diffPercent
      isIncreased
    }
  }
`;

export const GET_HEAD_COUNT_CHART = gql`
query GetHeadCountChart {
    headcountChart {
      title
      items {
        label
        value
      }
    }
  }
`;