import { PaginatedData, PagingInfoParams } from 'src/app/models/global.model';

export interface IEmployee {
  id: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  email: string;
  gender: number;
  joinedDate: string;
  dateOfBirth: string;
  // positionLevel?: IPositionLevel;
  phoneNumber?: string;
  currentContract?: number;
  profileBio: string;
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  department?: IDepartment;
  position?: IPosition;
  jobLevel?: IJobLevel;
  status: boolean;
  leftDate?: string;
  // reportTo?: number;
  // skillsTags?: string[];
  // joinedProjects?: Project[];
  // emergencyContacts: IEmergencyContact[];
  // damId: number;
  // employeeSkills: EmployeeSkill[];
}

export interface IEmployeeInfo {
  employee: IEmployee;
  imageUrl?: string;
  emergencyContacts: IEmergencyContact[];
}

export interface IAddEmployee {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  dateJoined: string;
  currentContract: number;
  profileBio: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  instagramLink: string;
  positionLevelId: number;
  departmentId: number;
}
export interface IUpdateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  dateJoined: string;
  currentContract: number;
  profileBio: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  instagramLink: string;
  positionLevelId: number;
  departmentId: number;
  positionId: number;
  jobLevelId: number;
  emergencyContacts: IEmergencyContact[];
}
export interface IDepartment {
  id: number;
  departmentName: string;
  sum: {
    firstName: string;
    lastName: string;
  };
}

interface IPositionLevel {
  position: IPosition;
  jobLevel: IJobLevel;
}

export interface IPosition {
  id: number;
  positionName: string;
  hasLevel: boolean;
  hasDepartment: boolean;
}

export interface IJobLevel {
  id: number;
  jobLevelName: string;
}
interface EmployeeSkill {
  skill: {
    skillName: string;
  };
}
export interface Project {
  name: string;
  workAs: string;
  skillsTags: string[];
  contributedHours: number;
}

export interface IEmergencyContact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IEmployeeApiResponse {
  employees: PaginatedData<IEmployeeInfo>;
}

export interface IEmployeeDetailApiResponse {
  employee: IEmployeeInfo;
}

export interface IDepartmentApiResponse {
  departments: Array<IDepartment>;
}

export interface INewEmployeeApiResponse {
  newEmployees: IEmployeeInfo[];
}

export interface IAddEmployeeApiResponse {
  employee: IEmployee;
}
export interface IPositionApiResponse {
  positions: IPosition[];
}

export interface IJobLevelApiResponse {
  jobLevels: IJobLevel[];
}
export interface IEmployeeParams {
  status?: boolean;
  departments?: number[];
  currentContracts?: number[];
  name?: string;
  pageNo?: number;
  pageSize?: number;
}

export enum ContractType {
  Fulltime = 0,
  Parttime = 1,
  Internship = 2,
}
