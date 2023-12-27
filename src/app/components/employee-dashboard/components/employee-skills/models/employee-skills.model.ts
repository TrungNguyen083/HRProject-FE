export interface IEmployeeSkillInfo {
  name: string;
  targetSkillLevel: number;
  skillLevelTotal: number;
  skillLevelSelf: number;
  skillLevelManager: number;
  competencyLevel: number;
}
export interface IEmployeeSkillMatrix {
  data: IEmployeeSkillInfo;
  children?: IEmployeeSkillMatrix[];
}
export interface IEmployeeSkillsMatrixApiResponse {
  employeeSkillMatrix: IEmployeeSkillMatrix[];
}
