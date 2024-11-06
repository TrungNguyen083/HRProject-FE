import { gql } from "apollo-angular";

export const performanceEvaluationLabelItems = [
  {
    label: 'self-evaluation-form',
    id: 'self-evaluation-form',
    title: 'Self Evaluation',
  },
  {
    label: 'manager-evaluation-form',
    id: 'manager-evaluation-form',
    title: 'Manager Evaluation',
  },
  {
    label: 'final-evaluation-form',
    id: 'final-evaluation-form',
    title: 'Final Evaluation',
  },
];

export const GET_EMPLOYEE_ID = gql`
query GetEmployeeIdByEmail($email: String!) {
  employeeId(email: $email)
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