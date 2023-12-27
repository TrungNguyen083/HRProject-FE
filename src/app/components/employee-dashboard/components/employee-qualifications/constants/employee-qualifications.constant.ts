import { gql } from 'apollo-angular';

export const GET_EMPLOYEE_QUALIFICATIONS = gql`
  query GetEmployeeQualifications($employeeId: Int!) {
    getQualifications(employeeId: $employeeId) {
      fileName
      filePath
      fileType {
        id
        name
        iconUrl
      }
    }
  }
`;
