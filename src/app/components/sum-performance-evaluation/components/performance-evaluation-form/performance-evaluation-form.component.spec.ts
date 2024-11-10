import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceEvaluationFormComponent } from './performance-evaluation-form.component';

describe('PerformanceEvaluationFormComponent', () => {
  let component: PerformanceEvaluationFormComponent;
  let fixture: ComponentFixture<PerformanceEvaluationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceEvaluationFormComponent]
    });
    fixture = TestBed.createComponent(PerformanceEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
