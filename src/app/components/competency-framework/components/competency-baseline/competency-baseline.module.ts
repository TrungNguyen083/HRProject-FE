import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetencyBaselineRoutingModule } from './competency-baseline-routing.module';
import { CompetencyBaselineComponent } from './competency-baseline.component';
import { ScrollerModule } from 'primeng/scroller';
import { ShareModule } from 'src/app/components/share/share.module';


@NgModule({
  declarations: [
    CompetencyBaselineComponent
  ],
  imports: [
    CommonModule,
    CompetencyBaselineRoutingModule,
    ScrollerModule,
    ShareModule
  ]
})
export class CompetencyBaselineModule { }
