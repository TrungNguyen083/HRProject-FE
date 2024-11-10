import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalEvaluationFormComponent } from './final-evaluation-form.component';

describe('FinalEvaluationFormComponent', () => {
  let component: FinalEvaluationFormComponent;
  let fixture: ComponentFixture<FinalEvaluationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalEvaluationFormComponent]
    });
    fixture = TestBed.createComponent(FinalEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
