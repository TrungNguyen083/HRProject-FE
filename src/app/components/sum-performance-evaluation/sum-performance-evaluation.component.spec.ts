import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumPerformanceEvaluationComponent } from './sum-performance-evaluation.component';

describe('SumPerformanceEvaluationComponent', () => {
  let component: SumPerformanceEvaluationComponent;
  let fixture: ComponentFixture<SumPerformanceEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumPerformanceEvaluationComponent]
    });
    fixture = TestBed.createComponent(SumPerformanceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
