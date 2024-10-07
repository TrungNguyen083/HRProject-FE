import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewStatusComponent } from './performance-review-status.component';

describe('PerformanceReviewStatusComponent', () => {
  let component: PerformanceReviewStatusComponent;
  let fixture: ComponentFixture<PerformanceReviewStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceReviewStatusComponent]
    });
    fixture = TestBed.createComponent(PerformanceReviewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
