import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEvaluationFormComponent } from './self-evaluation-form.component';

describe('SelfEvaluationFormComponent', () => {
  let component: SelfEvaluationFormComponent;
  let fixture: ComponentFixture<SelfEvaluationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfEvaluationFormComponent]
    });
    fixture = TestBed.createComponent(SelfEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
