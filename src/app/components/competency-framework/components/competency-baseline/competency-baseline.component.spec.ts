import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyBaselineComponent } from './competency-baseline.component';

describe('CompetencyBaselineComponent', () => {
  let component: CompetencyBaselineComponent;
  let fixture: ComponentFixture<CompetencyBaselineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyBaselineComponent]
    });
    fixture = TestBed.createComponent(CompetencyBaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
