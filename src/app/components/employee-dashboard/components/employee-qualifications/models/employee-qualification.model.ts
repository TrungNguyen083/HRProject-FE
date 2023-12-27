export interface IEmployeeQualificationsApiResponse {
  getQualifications: IQualificationFile[];
}

export interface IQualificationFile {
  fileName: string;
  filePath: string;
  fileType: IFileType;
}

export interface IFileType {
  id: number;
  name: string;
  iconUrl: string;
}