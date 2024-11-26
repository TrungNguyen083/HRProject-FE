import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPromotionComponent } from './evaluation-promotion.component';

describe('EvaluationPromotionComponent', () => {
  let component: EvaluationPromotionComponent;
  let fixture: ComponentFixture<EvaluationPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationPromotionComponent]
    });
    fixture = TestBed.createComponent(EvaluationPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
