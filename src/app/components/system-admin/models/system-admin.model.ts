import { PaginatedData } from 'src/app/models/global.model';

export interface IEmployeeAccount {
  userId: number;
  name?: string;
  userName: string;
  role?: IAccountRole;
  status?: boolean;
  createdAt?: string;
  password?: string;
  profileImage?: string;
}

export interface IAccountRole {
  roleId: number;
  name: string;
}
export interface IAccountParams {
  pageNo?: number;
  keyword?: string;
  roleId?: number;
  status?: boolean;
  pageSize?: number;
}

export interface IAccountApiResponse {
  users: PaginatedData<IEmployeeAccount>;
}

export interface IRoleApiResponse {
  roles: IAccountRole[];
}

export enum EAccountRole {
  Admin = 1,
  Employee = 2,
  HR = 3,
  SUM = 4,
  PM = 5,
  USER = 6,
  DIRECTOR = 7
}

export interface IUpdateAccountParams {
  userId: number;
  status: boolean;
  roleId: number;
}

export interface IAssignUserParams {
  userId: number;
  employeeId: number;
}

export interface IGetUserApiResponse {
  users: IEmployeeAccount;
}

export interface IUpdateAccountInfoParams {
  userId: number;
  username: string;
  password: string;
}
