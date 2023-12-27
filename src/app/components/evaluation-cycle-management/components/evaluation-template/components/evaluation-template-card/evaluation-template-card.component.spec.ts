import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTemplateCardComponent } from './evaluation-template-card.component';

describe('EvaluationTemplateCardComponent', () => {
  let component: EvaluationTemplateCardComponent;
  let fixture: ComponentFixture<EvaluationTemplateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationTemplateCardComponent]
    });
    fixture = TestBed.createComponent(EvaluationTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
