import { gql } from 'apollo-angular';

export const GET_EVALUATE_CYCLE_OVERALL = gql`
  query GetEvaluateCycleOverall {
    cyclesOverall {
        name
        status
        startDate
        dueDate
        completedEvaluate {
            labels
            datasets
        }
        competencyOverall {
            labels
            datasets
        }
        performanceOverall {
            labels
            datasets
        }
    }
  }
`;

export const CREATE_EVALUATION_CYCLE = gql`
  mutation CreateEvaluationCycle($input: EvaluateCycleInput!) {
    createEvaluationCycle(input: $input)
  }
`;