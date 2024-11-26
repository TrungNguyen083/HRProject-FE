import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationResultComponent } from './evaluation-result.component';

describe('EvaluationResultComponent', () => {
  let component: EvaluationResultComponent;
  let fixture: ComponentFixture<EvaluationResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationResultComponent]
    });
    fixture = TestBed.createComponent(EvaluationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
