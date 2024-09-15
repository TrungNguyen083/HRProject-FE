import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCycleInfoFormComponent } from './evaluation-cycle-info-form.component';

describe('EvaluationCycleInfoFormComponent', () => {
  let component: EvaluationCycleInfoFormComponent;
  let fixture: ComponentFixture<EvaluationCycleInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationCycleInfoFormComponent]
    });
    fixture = TestBed.createComponent(EvaluationCycleInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
