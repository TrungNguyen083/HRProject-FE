import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTemplateListComponent } from './evaluation-template-list.component';

describe('EvaluationTemplateListComponent', () => {
  let component: EvaluationTemplateListComponent;
  let fixture: ComponentFixture<EvaluationTemplateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationTemplateListComponent]
    });
    fixture = TestBed.createComponent(EvaluationTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
