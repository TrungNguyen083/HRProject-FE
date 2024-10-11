export interface ICompetencyInfo {
  name: string;
  targetSkillLevel: number;
  skillLevelTotal: number;
  skillLevelSelf: number;
  skillLevelManager: number;
  competencyLevel: number;
}

export interface ICompetencyMatrix {
  data: ICompetencyInfo;       // Data related to the competency
  children?: ICompetencyMatrix[];  // Nested competencies (sub-competencies)
}
