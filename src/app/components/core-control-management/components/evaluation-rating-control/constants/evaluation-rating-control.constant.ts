import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/models/global.model';

export const ratingControlTableCol: TableHeader[] = [
  {
    col: 'Rating score',
    field: '',
  },
  {
    col: 'Label',
    field: '',
  },
  {
    col: 'Description',
    field: '',
  },
  {
    col: '',
    field: '',
  },
];

export const GET_PROFICIENCY_LEVELS = gql`
  query GetProficiencyLevels {
    proficiencyLevels {
      id
      proficiencyLevelDescription
      proficiencyLevelName
      score
    }
  }
`;

export const GET_PERFORMANCE_RANGE = gql`
  query GetPerformanceRanges {
    performanceRanges {
      id
      text
      description
      minValue
      maxValue
      ordered
    }
  }
`;

export const CREATE_PROFICIENCY_LEVEL = gql`
  mutation CreateProficiencyLevel($input: ProficiencyLevelInput!) {
    createProficiencyLevel(input: $input)
  }
`;

export const UPDATE_PROFICIENCY_LEVEL = gql`
  mutation UpdateProficiencyLevel($id: Int!, $input: ProficiencyLevelInput!) {
    updateProficiencyLevel(id: $id, input: $input)
  }
`;

export const CREATE_PERFORMANCE_RANGE = gql`
  mutation CreatePerformanceRange($input: PerformanceRangeInput!) {
    createPerformanceRange(input: $input)
  }
`;

export const UPDATE_PERFORMANCE_RANGE = gql`
  mutation UpdatePerformanceRange($id: Int!, $input: PerformanceRangeInput!) {
    updatePerformanceRange(id: $id, input: $input)
  }
`;

export const DELETE_PROFICIENCY_LEVEL = gql`
  mutation DeleteProficiencyLevel($id: Int!) {
    deleteProficiencyLevel(id: $id)
  }
`;

export const DELETE_PERFORMANCE_RANGE = gql`
  mutation DeletePerformanceRange($id: Int!) {
    deletePerformanceRange(id: $id)
  }
`;


