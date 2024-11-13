import { NgModule } from "@angular/core";
import { CompetencyMatrixComponent } from "./competency-matrix.component";
import { RouterModule, Routes } from "@angular/router";
import { CompetencyTreeComponent } from "./components/competency-tree/competency-tree.component";

const routes: Routes = [{
  path: '',
  component: CompetencyMatrixComponent,
  children: [
    {
      path: '',
      component: CompetencyTreeComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetencyMatrixRoutingModule { }