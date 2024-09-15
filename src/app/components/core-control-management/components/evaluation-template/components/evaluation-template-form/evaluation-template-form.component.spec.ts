import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTemplateFormComponent } from './evaluation-template-form.component';

describe('EvaluationTemplateFormComponent', () => {
  let component: EvaluationTemplateFormComponent;
  let fixture: ComponentFixture<EvaluationTemplateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationTemplateFormComponent]
    });
    fixture = TestBed.createComponent(EvaluationTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
