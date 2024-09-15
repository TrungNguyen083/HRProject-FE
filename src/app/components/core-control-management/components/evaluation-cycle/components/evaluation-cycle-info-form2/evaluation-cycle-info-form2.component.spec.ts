import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCycleInfoForm2Component } from './evaluation-cycle-info-form2.component';

describe('EvaluationCycleInfoForm2Component', () => {
  let component: EvaluationCycleInfoForm2Component;
  let fixture: ComponentFixture<EvaluationCycleInfoForm2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationCycleInfoForm2Component]
    });
    fixture = TestBed.createComponent(EvaluationCycleInfoForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
