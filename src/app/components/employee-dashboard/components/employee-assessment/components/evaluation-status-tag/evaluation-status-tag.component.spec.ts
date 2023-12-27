import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationStatusTagComponent } from './evaluation-status-tag.component';

describe('EvaluationStatusTagComponent', () => {
  let component: EvaluationStatusTagComponent;
  let fixture: ComponentFixture<EvaluationStatusTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationStatusTagComponent]
    });
    fixture = TestBed.createComponent(EvaluationStatusTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
