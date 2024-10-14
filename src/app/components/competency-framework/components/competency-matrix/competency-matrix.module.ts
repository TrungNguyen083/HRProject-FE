import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetencyMatrixComponent } from './competency-matrix.component';
import { CompetencyMatrixRoutingModule } from './competency-matrix-routing.module';



@NgModule({
  declarations: [
    CompetencyMatrixComponent
  ],
  imports: [
    CommonModule,
    CompetencyMatrixRoutingModule
  ]
})
export class CompetencyMatrixModule { }
