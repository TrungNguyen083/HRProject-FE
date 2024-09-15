export interface ITemplate {
    templateName: string;
    templateDescription: string;
    createdAt: string;
    createdBy: string;
}

export interface ITemplateApiResponse {
    templates: ITemplate[]
}