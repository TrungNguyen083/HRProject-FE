import { Injectable } from "@angular/core";
import { ICompetencyGroup, ICompetencyTree } from "../models/competency-matrix.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { switchMap } from "rxjs";
import { CompetencyMatrixService } from "../services/competency-matrix.service";

interface CompetencyMatrixState {
  competencyMatrixTree: ICompetencyTree[];
  competencyGroups: ICompetencyGroup[];
}

@Injectable({
  providedIn: 'root',
})
export class CompetencyMatrixStore extends ComponentStore<CompetencyMatrixState> {
  constructor(private competencMatrixService: CompetencyMatrixService) {
    super({
      competencyMatrixTree: [],
      competencyGroups: []
    })
  }

  readonly competencyMatrixTree$ = this.select(state => state.competencyMatrixTree);
  readonly competencyGroups$ = this.select(state => state.competencyGroups);

  //UPDATER
  readonly setCompetencyTree = this.updater(
    (state: CompetencyMatrixState, competencyMatrixTree: ICompetencyTree[]) => {
      return { ...state, competencyMatrixTree };
    },
  );

  readonly setCompetencyGroups = this.updater(
    (state: CompetencyMatrixState, competencyGroups: ICompetencyGroup[]) => {
      return { ...state, competencyGroups };
    },
  );

  //EFFECT
  readonly getCompetencyTree = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.competencMatrixService.getCompetencyTree().pipe(
          tapResponse({
            next: res => this.setCompetencyTree(res.competencyMatrixTree),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );

  readonly getCompetencyGroups = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.competencMatrixService.getCompetencyGroup().pipe(
          tapResponse({
            next: res => this.setCompetencyGroups(res.competencyGroups),
            error: error => console.log(error),
          }),
        ),
      ),
    ),
  );
}