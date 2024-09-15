import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTemplateComponent } from './evaluation-template.component';

describe('EvaluationTemplateComponent', () => {
  let component: EvaluationTemplateComponent;
  let fixture: ComponentFixture<EvaluationTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationTemplateComponent]
    });
    fixture = TestBed.createComponent(EvaluationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
