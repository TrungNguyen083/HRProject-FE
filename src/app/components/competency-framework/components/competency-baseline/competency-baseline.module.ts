import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetencyBaselineRoutingModule } from './competency-baseline-routing.module';
import { CompetencyBaselineComponent } from './competency-baseline.component';


@NgModule({
  declarations: [
    CompetencyBaselineComponent
  ],
  imports: [
    CommonModule,
    CompetencyBaselineRoutingModule
  ]
})
export class CompetencyBaselineModule { }
