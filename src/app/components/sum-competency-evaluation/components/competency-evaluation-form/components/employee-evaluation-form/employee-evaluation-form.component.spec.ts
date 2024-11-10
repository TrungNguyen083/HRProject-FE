import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEvaluationFormComponent } from './employee-evaluation-form.component';

describe('EmployeeEvaluationFormComponent', () => {
  let component: EmployeeEvaluationFormComponent;
  let fixture: ComponentFixture<EmployeeEvaluationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeEvaluationFormComponent]
    });
    fixture = TestBed.createComponent(EmployeeEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
