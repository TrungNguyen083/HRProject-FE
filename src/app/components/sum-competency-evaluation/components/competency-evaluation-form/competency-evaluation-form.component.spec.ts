import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyEvaluationFormComponent } from './competency-evaluation-form.component';

describe('CompetencyEvaluationFormComponent', () => {
  let component: CompetencyEvaluationFormComponent;
  let fixture: ComponentFixture<CompetencyEvaluationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyEvaluationFormComponent]
    });
    fixture = TestBed.createComponent(CompetencyEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
