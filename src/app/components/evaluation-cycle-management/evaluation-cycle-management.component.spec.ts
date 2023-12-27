import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCycleManagementComponent } from './evaluation-cycle-management.component';

describe('EvaluationCycleManagementComponent', () => {
  let component: EvaluationCycleManagementComponent;
  let fixture: ComponentFixture<EvaluationCycleManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationCycleManagementComponent]
    });
    fixture = TestBed.createComponent(EvaluationCycleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
