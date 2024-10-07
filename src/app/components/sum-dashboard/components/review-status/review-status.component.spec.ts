import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStatusComponent } from './review-status.component';

describe('ReviewStatusComponent', () => {
  let component: ReviewStatusComponent;
  let fixture: ComponentFixture<ReviewStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewStatusComponent]
    });
    fixture = TestBed.createComponent(ReviewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
