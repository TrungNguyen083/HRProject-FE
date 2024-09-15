import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceRankingRatingComponent } from './performance-ranking-rating.component';

describe('PerformanceRankingRatingComponent', () => {
  let component: PerformanceRankingRatingComponent;
  let fixture: ComponentFixture<PerformanceRankingRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceRankingRatingComponent]
    });
    fixture = TestBed.createComponent(PerformanceRankingRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
