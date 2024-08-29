

export interface IQualificationFile {
  title: string;
  fileName: string;
  url: string;
  uploadAt: string;
}

export interface IQualificationApiResponse {
  qualifications: IQualificationFile[];
}