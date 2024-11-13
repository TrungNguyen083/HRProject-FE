import { IHeatMapDTO } from "src/app/components/sum-dashboard/models/sum-dashboard.model";
import { IPositionLevel } from "../models/competency-baseline.model";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { CompetencyBaselineService } from "../services/competency-baseline.service";
import { Observable, switchMap } from "rxjs";

interface CompetencyBaselineState {
    positionOption: IPositionLevel[];
    competencyBaseLine: IHeatMapDTO[];
}
@Injectable({
    providedIn: 'root',
})
export class CompetencyBaselineStore extends ComponentStore<CompetencyBaselineState> {
    constructor(private competencyBaselineService: CompetencyBaselineService) {
        super({
            positionOption: [],
            competencyBaseLine: [],
        });
    }

    readonly positionOption$ = this.select(state => state.positionOption);
    readonly competencyBaseLine$ = this.select(state => state.competencyBaseLine);

    //UPDATER

    readonly setPositionOption = this.updater(
        (state: CompetencyBaselineState, positionOption: IPositionLevel[]) => {
            return { ...state, positionOption: positionOption };
        },
    );

    readonly setCompetencyBaseLine = this.updater(
        (state: CompetencyBaselineState, competencyBaseLine: IHeatMapDTO[]) => {
            return { ...state, competencyBaseLine: competencyBaseLine };
        },
    );

    //EFFECT

    readonly getPositionOption = this.effect((params$: Observable<string>) =>
        params$.pipe(
            switchMap(params =>
                this.competencyBaselineService.getPositionOption(params).pipe(
                    tapResponse({
                        next: res => {
                            this.setPositionOption(res.positionOption);
                        },
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );

    readonly getCompetencyBaseline = this.effect((params$: Observable<number>) =>
        params$.pipe(
            switchMap(params =>
                this.competencyBaselineService.getCompetencyBaseline(params).pipe(
                    tapResponse({
                        next: res => {
                            this.setCompetencyBaseLine(res.competencyBaseLine);
                        },
                        error: error => console.log(error),
                    }),
                ),
            ),
        ),
    );
}