import { gql } from "apollo-angular";

export const GET_DEPARTMENT_ID = gql`
query GetDepartmentId($email: String!) {
  departmentId(email: $email)
}
`;

export const GET_EVALUATE_CYCLES = gql`
  query GetEvaluateCycles {
    evaluateCycles {
      id
      evaluateCycleName
      description
      startDate
      dueDate
      year
      status
      initialDate
    }
  }
`;

export const GET_COMPETENCY_REVIEW_PROGRESS = gql`
query GetCompetencyReviewProgress($cycleId: Int!, $departmentId: Int!) {
  completedEvaluationByPosition(cycleId: $cycleId, departmentId: $departmentId) {
    labels
    datasets{
      label
      data
    }
  }

  competencyEvaluationProgressPieChart(cycleId: $cycleId, departmentId: $departmentId) {
    labels
    datasets
  }
}
`;

export const GET_PERFORMANCE_REVIEW_PROGRESS = gql`
query GetPerformanceReviewProgress($cycleId: Int!, $departmentId: Int!) {
  completedPerformEvaluationByPosition(cycleId: $cycleId, departmentId: $departmentId) {
    labels
    datasets{
      label
      data
    }
  }

  performanceEvaluationProgressPieChart(cycleId: $cycleId, departmentId: $departmentId) {
    labels
    datasets
  }
}
`;

export const GET_COMPETENCY_STATUS = gql`
query GetCompetencyEvaluationStatus($cycleId: Int!, $departmentId: Int!) {
  competencyEvaluationStatus(cycleId: $cycleId, departmentId: $departmentId) {
    id
    firstName
    lastName
    status
    profileImg
  }
}
`

export const GET_PERFORMANCE_STATUS = gql`
query GetPerformanceEvaluationStatus($cycleId: Int!, $departmentId: Int!) {
  performanceEvaluationStatus(cycleId: $cycleId, departmentId: $departmentId) {
    id
    firstName
    lastName
    status
    profileImg
  }
}
`

export const GET_DEPARTMENT_EMPLOYEE = gql`
query GetDepartmentEmployee($departmentId: Int!) {
  employeesInDepartment(departmentId: $departmentId) {
    id
    firstName
    lastName
    profileImgUrl
  }
}
`

export const GET_COMPETENCY_GAP_RADAR_CHART = gql`
query GetCompetencyRadarChart($cycleId: Int!, $employeeIds: [Int]!) {
  departmentCompetencyGap(cycleId: $cycleId, employeeIds: $employeeIds) {
    labels
    datasets {
      lineName
      dataset
    }
  }
}
`

export const GET_COMPETENCIES = gql`
query GetCompetencies {
    competencies {
      id
      competencyName
    }
  }
`

export const GET_HEAT_MAP_SKILL_LEVEL = gql`
query GetHeatMapSkillLevel($cycleId: Int!, $employeeIds: [Int]!, $competencyIds: [Int]!) {
  departmentSkillHeatMap(cycleId: $cycleId, employeeIds: $employeeIds, competencyIds: $competencyIds) {
    verticalColumnName
    horizontalColumnName
    score
  }
}
`

export const GET_TOP_SKILLS = gql`
  query GetTopSkill($departmentId: Int, $evaluateCycleId: Int!, $pageNo: Int, $pageSize: Int) {
    topSkill(departmentId: $departmentId, evaluateCycleId: $evaluateCycleId, pageNo: $pageNo, pageSize: $pageSize) {
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
  query GetTopPerformers($departmentId: Int, $cycleId: Int!, $pageNo: Int, $pageSize: Int) {
    topPerformers(departmentId: $departmentId, cycleId: $cycleId, pageNo: $pageNo, pageSize: $pageSize) {
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
  query GetTopCompetencies($departmentId: Int, $cycleId: Int!, $pageNo: Int!, $pageSize: Int!) {
    topCompetencyRating(departmentId: $departmentId, cycleId: $cycleId, pageNo: $pageNo, pageSize: $pageSize) {
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

export const GET_POTENTIAL_PERFORMANCE = gql`
query GetDepartmentPotentialPerformance($departmentId: Int!, $cycleId: Int!) {
    departmentPotentialAndPerformance(departmentId: $departmentId, cycleId: $cycleId) {
      employeeId
      fullName
      profileImgUri
      potential
      performance
    }
  }
`

export const GET_COMPETENCY_OVERVIEW = gql`
query GetCompetencyOverview($departmentId: Int, $cycleId: Int!) {
  competencyOverviewChart(departmentId: $departmentId, cycleId: $cycleId) {
    title
    items {
      label
      value
    }
  }
}
`

export const GET_PERFORMANCE_OVERVIEW = gql`
query GetPerformanceOverview($departmentId: Int, $cycleId: Int!) {
  performanceOverviewChart(departmentId: $departmentId, cycleId: $cycleId) {
    title
    items {
      label
      value
    }
  }
}
`

export const GET_COMPETENCY_DIFF = gql`
query GetCompetencyDiff($departmentId: Int, $cycleId: Int!) {
  competencyDiffPercent(departmentId: $departmentId, cycleId: $cycleId) {
    first
    second
    diffPercent
    isIncreased
  }
}
`

export const GET_PERFORMANCE_DIFF = gql`
query GetPerformanceDiff($departmentId: Int, $cycleId: Int!) {
  performanceDiffPercent(departmentId: $departmentId, cycleId: $cycleId) {
    first
    second
    diffPercent
    isIncreased
  }
}
`

export const GET_DEPARTMENT_HEADCOUNT = gql`
query GetDepartmentHeadcount($departmentId: Int!, $cycleId: Int!) {
  departmentHeadcount(departmentId: $departmentId, cycleId: $cycleId) {
    data
    diffPercent
    isIncreased
  }
}
`

export const GET_DEPARTMENT_HEADCOUNT_CHART = gql`
query GetDepartmentHeadcountChart($departmentId: Int!) {
  departmentHeadcountChart(departmentId: $departmentId) {
    title
    items {
      label
      value
    }
  }
}
`