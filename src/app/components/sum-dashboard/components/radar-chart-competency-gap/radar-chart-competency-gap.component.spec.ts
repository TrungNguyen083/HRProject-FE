import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartCompetencyGapComponent } from './radar-chart-competency-gap.component';

describe('RadarChartCompetencyGapComponent', () => {
  let component: RadarChartCompetencyGapComponent;
  let fixture: ComponentFixture<RadarChartCompetencyGapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadarChartCompetencyGapComponent]
    });
    fixture = TestBed.createComponent(RadarChartCompetencyGapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
