import { IEmployee } from '../../employee-management/models/employee-management.model';

export interface IEmployeeOverviewApiResponse {
  employeeOverview: IEmployeeOverview;
}

export interface IEmployeeOverview {
  employee: IEmployee;
  skills: { skillSetName: string }[];
  interests: { skillSetName: string }[];
  certification: string[];
}
