import { gql } from 'apollo-angular';
import { MenuItem } from 'primeng/api';
import { TableHeader } from 'src/app/models/global.model';

export const userAccount: TableHeader[] = [
  { col: 'Username', field: 'username' },
  { col: 'Status', field: 'status' },
  { col: 'Created at', field: 'createdAt' },
  { col: 'Role', field: 'role' },
  { col: '', field: 'active' },
  { col: '', field: 'asign' },
  { col: '', field: 'action' },
];
export const userLabelItems: MenuItem[] = [
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

export const GET_USERS = gql`
  query GetUsers(
    $search: String
    $status: Boolean
    $roleId: Int
    $pageNo: Int
  ) {
    users(search: $search, roleId: $roleId, pageNo: $pageNo, status: $status) {
      data {
        userId
        userName
        createdAt
        status
        role {
          roleId
          name
        }
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

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      roleId
      name
    }
  }
`;

export const UPDATE_USERS = gql`
  mutation UpdateUsers($userId: Int!, $status: Boolean, $roleId: Int) {
    updateUsers(userId: $userId, status: $status, roleId: $roleId)
  }
`;

export const GET_USER = gql`
  query GetUser($id: Int) {
    user(id: $id) {
      userId
      username
      status  
      role {
        roleId
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserAccount(
    $userId: Int!
    $username: String!
    $password: String!
  ){
    updateUsernamePassword(
      userId: $userId
      username: $username
      password: $password
    )
  }
`
