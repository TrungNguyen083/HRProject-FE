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
