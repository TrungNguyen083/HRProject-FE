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
    id: '2',
    title: 'Qualifications',
  },
  {
    label: 'evaluation',
    id: '3',
    title: 'Evaluation',
  },
];

export const GET_EMPLOYEE_OVERVIEW = gql`
  query GetEmployeeOverview($employeeId: Int!) {
    employeeOverview(employeeId: $employeeId) {
      firstName
      lastName
      profileImgUri
      position
      level
      address
      skills
      qualifications
  }
}
`;

export const GET_EMPLOYEE_ID = gql`
query GetEmployeeIdByEmail($email: String!) {
  employeeId(email: $email)
}
`;

export const GET_PROFILE_IMAGE = gql`
query GetEmployeeProfileImageByEmail($email: String!) {
  profileImage(email: $email)
}
`;
