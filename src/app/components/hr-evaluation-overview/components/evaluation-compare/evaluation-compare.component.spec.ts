import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCompareComponent } from './evaluation-compare.component';

describe('EvaluationCompareComponent', () => {
  let component: EvaluationCompareComponent;
  let fixture: ComponentFixture<EvaluationCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationCompareComponent]
    });
    fixture = TestBed.createComponent(EvaluationCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
