import { Injectable } from "@angular/core";
import { ICompetencyTree } from "../models/competency-matrix.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { switchMap } from "rxjs";
import { CompetencyMatrixService } from "../services/competency-matrix.service";

interface CompetencyMatrixState {
    competencyMatrixTree: ICompetencyTree[];
}

@Injectable({
    providedIn: 'root',
})
export class CompetencyMatrixStore extends ComponentStore<CompetencyMatrixState> {
    constructor(private competencMatrixService: CompetencyMatrixService) {
        super({
            competencyMatrixTree: [],
        })
    }

    readonly competencyMatrixTree$ = this.select(state => state.competencyMatrixTree);

    //UPDATER
    readonly setCompetencyTree = this.updater(
        (state: CompetencyMatrixState, competencyMatrixTree: ICompetencyTree[]) => {
            return { ...state, competencyMatrixTree };
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
}