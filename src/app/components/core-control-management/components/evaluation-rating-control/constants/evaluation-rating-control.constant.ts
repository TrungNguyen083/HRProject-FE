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
      order
    }
  }
`;


