import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyReviewProgressComponent } from './competency-review-progress.component';

describe('CompetencyReviewProgressComponent', () => {
  let component: CompetencyReviewProgressComponent;
  let fixture: ComponentFixture<CompetencyReviewProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyReviewProgressComponent]
    });
    fixture = TestBed.createComponent(CompetencyReviewProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
