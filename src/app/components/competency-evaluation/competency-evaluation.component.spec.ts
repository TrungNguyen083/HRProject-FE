import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyEvaluationComponent } from './competency-evaluation.component';

describe('CompetencyEvaluationComponent', () => {
  let component: CompetencyEvaluationComponent;
  let fixture: ComponentFixture<CompetencyEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyEvaluationComponent]
    });
    fixture = TestBed.createComponent(CompetencyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
