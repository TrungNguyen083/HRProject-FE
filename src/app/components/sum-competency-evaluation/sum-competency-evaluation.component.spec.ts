import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCompetencyEvaluationComponent } from './sum-competency-evaluation.component';

describe('SumCompetencyEvaluationComponent', () => {
  let component: SumCompetencyEvaluationComponent;
  let fixture: ComponentFixture<SumCompetencyEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumCompetencyEvaluationComponent]
    });
    fixture = TestBed.createComponent(SumCompetencyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
