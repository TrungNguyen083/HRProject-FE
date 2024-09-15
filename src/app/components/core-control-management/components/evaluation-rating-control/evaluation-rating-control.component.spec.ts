import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationRatingControlComponent } from './evaluation-rating-control.component';

describe('EvaluationRatingControlComponent', () => {
  let component: EvaluationRatingControlComponent;
  let fixture: ComponentFixture<EvaluationRatingControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationRatingControlComponent]
    });
    fixture = TestBed.createComponent(EvaluationRatingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
