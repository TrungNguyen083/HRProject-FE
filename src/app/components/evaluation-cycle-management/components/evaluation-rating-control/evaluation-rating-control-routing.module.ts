import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationRatingControlComponent } from './evaluation-rating-control.component';

const routes: Routes = [{
  path: '',
  component: EvaluationRatingControlComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRatingControlRoutingModule { }
