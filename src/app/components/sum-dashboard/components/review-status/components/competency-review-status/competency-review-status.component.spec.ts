import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyReviewStatusComponent } from './competency-review-status.component';

describe('CompetencyReviewStatusComponent', () => {
  let component: CompetencyReviewStatusComponent;
  let fixture: ComponentFixture<CompetencyReviewStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyReviewStatusComponent]
    });
    fixture = TestBed.createComponent(CompetencyReviewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
