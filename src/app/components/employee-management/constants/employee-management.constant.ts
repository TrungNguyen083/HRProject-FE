import { gql } from 'apollo-angular';
import { MenuItem } from 'primeng/api';
import { TableHeader } from 'src/app/models/global.model';

export const employeeTableCols: TableHeader[] = [
  { col: 'Name', field: 'firstName' },
  { col: 'Position', field: 'position' },
  { col: 'Email', field: 'email' },
  { col: 'Department', field: 'department' },
  { col: 'Contract', field: 'currentContract' },
  { col: 'Status', field: 'status' },
  { col: '', field: '' },
];

export const employeeLabelItems: MenuItem[] = [
  {
    label: 'all',
    id: '',
    title: 'All',
  },
  {
    label: 'active',
    id: '1',
    title: 'Active',
  },
  {
    label: 'inactive',
    id: '0',
    title: 'Inactive',
  },
];

export const genders = [
  {
    label: 'Male',
    value: 1,
  },
  {
    label: 'Female',
    value: 0,
  },
];

export const currentContracts = [
  {
    label: 'Full-time',
    value: 0,
  },
  {
    label: 'Part-time',
    value: 1,
  },
  {
    label: 'Internship',
    value: 2,
  },
];

export const GET_EMPLOYEES = gql`
  query GetEmployees(
    $status: Boolean
    $departmentIds: [Int]
    $currentContracts: [Int]
    $pageNo: Int
    $pageSize: Int
    $name: String
  ) {
    employees(
      status: $status
      departmentIds: $departmentIds
      currentContracts: $currentContracts
      pageNo: $pageNo
      pageSize: $pageSize
      name: $name
    ) {
      pagination {
        pageNo
        pageSize
        totalItems
        totalPages
      }
      data {
        employee {
          id
          firstName
          lastName
          address
          email
          gender
          joinedDate
          dateOfBirth
          phoneNumber
          currentContract
          profileBio
          facebookLink
          twitterLink
          linkedinLink
          instagramLink
          department {
            id
            departmentName
          }
          position{
            id
            positionName
          }
          jobLevel{
            id
            jobLevelName
          }
          status
          leftDate
        }
        imageUrl
        emergencyContacts {
          id
          firstName
          lastName
          phoneNumber
        }
        skills {
          id
          skillName
          competency {
            id
            competencyName
          }
          description
        }
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: Int!) {
    employee(id: $id) {
      employee {
        id
        firstName
        lastName
        address
        email
        gender
        joinedDate
        dateOfBirth
        phoneNumber
        currentContract
        profileBio
        facebookLink
        twitterLink
        linkedinLink
        instagramLink
        department {
          id
          departmentName
          sum {
            id
            firstName
            lastName
          }
        }
        position{
          id
          positionName
        }
        jobLevel{
          id
          jobLevelName
        }
        status
        leftDate
      }
      imageUrl
      emergencyContacts {
        id
        firstName
        lastName
        phoneNumber
      }
      skills {
        id
        skillName
        competency {
          id
          competencyName
        }
        description
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    createProfile(input: $input) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($input: EmployeeInput!) {
    updateEmployee(input: $input) {
      firstName
      lastName
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      departmentName
    }
  }
`;

export const GET_NEW_EMPLOYEES = gql`
  query GetEmployeesCarousel {
    newEmployees {
      employee{
        id
        firstName
        lastName
        email
        position {
          positionName
        }
        phoneNumber
        currentContract
      }
      imageUrl
      skills {
          id
          skillName
        }
    }
  }
`;

export const GET_POSITIONS = gql`
  query GetPositions {
    positions {
      id
      positionName
      hasLevel
      hasDepartment
    }
  }
`;

export const GET_JOB_LEVELS = gql`
  query GetJobLevels {
    jobLevels {
      id
      jobLevelName
    }
  }
`;
