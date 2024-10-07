import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumOverviewCompetencyComponent } from './sum-overview-competency.component';

describe('SumOverviewCompetencyComponent', () => {
  let component: SumOverviewCompetencyComponent;
  let fixture: ComponentFixture<SumOverviewCompetencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumOverviewCompetencyComponent]
    });
    fixture = TestBed.createComponent(SumOverviewCompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
