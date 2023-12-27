import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOverviewCompetencyComponent } from './hr-overview-competency.component';

describe('HrOverviewCompetencyComponent', () => {
  let component: HrOverviewCompetencyComponent;
  let fixture: ComponentFixture<HrOverviewCompetencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrOverviewCompetencyComponent]
    });
    fixture = TestBed.createComponent(HrOverviewCompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
