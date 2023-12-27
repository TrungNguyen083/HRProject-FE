import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEvaluationHeaderComponent } from './employee-evaluation-header.component';

describe('EmployeeEvaluationHeaderComponent', () => {
  let component: EmployeeEvaluationHeaderComponent;
  let fixture: ComponentFixture<EmployeeEvaluationHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeEvaluationHeaderComponent]
    });
    fixture = TestBed.createComponent(EmployeeEvaluationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
