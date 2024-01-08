
export interface IEmployeeOverview {
  id: number;
  firstName: string;
  lastName: string;
  profileImgUri: string;
  position: string;
  level: string;
  skillSets: string[];
  certification: string[];
}

export interface IEmployeeOverviewApiResponse {
  employeeOverview: IEmployeeOverview;
}
