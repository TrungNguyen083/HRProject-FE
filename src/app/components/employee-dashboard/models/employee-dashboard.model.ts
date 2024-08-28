
export interface IEmployeeOverview {
  id: number;
  firstName: string;
  lastName: string;
  profileImgUri: string;
  position: string;
  level: string;
  address: string;
  skills: string[];
  certification: string[];
}

export interface IEmployeeOverviewApiResponse {
  employeeOverview: IEmployeeOverview;
}

export interface IEmployeeIdApiResponse {
  employeeId: number;
}
