import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationRatingControlItemComponent } from './evaluation-rating-control-item.component';

describe('EvaluationRatingControlItemComponent', () => {
  let component: EvaluationRatingControlItemComponent;
  let fixture: ComponentFixture<EvaluationRatingControlItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationRatingControlItemComponent]
    });
    fixture = TestBed.createComponent(EvaluationRatingControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
