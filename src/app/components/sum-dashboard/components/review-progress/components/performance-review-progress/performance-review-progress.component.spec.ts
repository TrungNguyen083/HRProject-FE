import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewProgressComponent } from './performance-review-progress.component';

describe('PerformanceReviewProgressComponent', () => {
  let component: PerformanceReviewProgressComponent;
  let fixture: ComponentFixture<PerformanceReviewProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceReviewProgressComponent]
    });
    fixture = TestBed.createComponent(PerformanceReviewProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
