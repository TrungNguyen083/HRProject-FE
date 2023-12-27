import { Injectable } from '@angular/core';

const dummies = [
  {
    id: 1,
    rating: 1,
    label: 'Basic',
    description: 'Utilizes processes, procedures and methods in order to achieve the desired objectives and improve productivity in performance'
  },
  {
    id: 1,
    rating: 1,
    label: 'Proficient',
    description: 'Utilizes processes, procedures and methods in order to achieve the desired objectives and improve productivity in performance'
  },
  {
    id: 1,
    rating: 1,
    label: 'Advanced',
    description: 'Utilizes processes, procedures and methods in order to achieve the desired objectives and improve productivity in performance'
  },
  {
    id: 1,
    rating: 1,
    label: 'Expert',
    description: 'Utilizes processes, procedures and methods in order to achieve the desired objectives and improve productivity in performance'
  },
]
@Injectable({
  providedIn: 'root'
})
export class EvaluationRatingControlService {

  getProficiencyLevels(){
    return dummies
  }
}
