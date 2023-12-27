import { gql } from 'apollo-angular';

export const GET_EMPLOYEE_SKILLS_MATRIX = gql`
  query GetEmployeeSkillsMatrix($employeeId: Int!) {
    employeeSkillMatrix(employeeId: $employeeId) {
      data {
        name
        targetSkillLevel
        skillLevelTotal
        skillLevelSelf
        skillLevelManager
        competencyLevel
      }
      children {
        data {
          name
          targetSkillLevel
          skillLevelTotal
          skillLevelSelf
          skillLevelManager
          competencyLevel
        }
      }
    }
  }
`;
