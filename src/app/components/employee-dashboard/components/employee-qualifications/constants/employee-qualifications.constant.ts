import { gql } from 'apollo-angular';

export const GET_EMPLOYEE_QUALIFICATIONS = gql`
  query GetQualifications($employeeId: Int!) {
    qualifications(employeeId: $employeeId) {
      title
      fileName
      url
      uploadAt
    }
  }
`;
