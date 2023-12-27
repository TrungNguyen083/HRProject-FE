import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEvaluationTableComponent } from './employee-evaluation-table.component';

describe('EmployeeEvaluationTableComponent', () => {
  let component: EmployeeEvaluationTableComponent;
  let fixture: ComponentFixture<EmployeeEvaluationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeEvaluationTableComponent]
    });
    fixture = TestBed.createComponent(EmployeeEvaluationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
