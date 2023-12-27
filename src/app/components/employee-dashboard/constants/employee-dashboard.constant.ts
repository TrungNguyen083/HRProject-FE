import { gql } from 'apollo-angular';

export const employeeInfoLabelItems = [
  {
    label: 'summary',
    id: '',
    title: 'Summary',
  },
  {
    label: 'skills',
    id: '1',
    title: 'Skills',
  },
  {
    label: 'qualifications',
    id: '0',
    title: 'Qualifications',
  },
  {
    label: 'evaluation',
    id: '',
    title: 'Evaluation',
  },
];

export const GET_EMPLOYEE_OVERVIEW = gql`
  query GetEmployeeOverview($employeeId: Int!) {
    employeeOverview(employeeId: $employeeId) {
      employee {
        damId
        firstName
        lastName
        positionLevel {
          jobLevel {
            jobLevelName
          }
          position {
            positionName
          }
        }
        address
      }
      skills {
        skillSetName
      }
      interests {
        skillSetName
      }
      certification
    }
  }
`;
