import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceRankingFormComponent } from './performance-ranking-form.component';

describe('PerformanceRankingFormComponent', () => {
  let component: PerformanceRankingFormComponent;
  let fixture: ComponentFixture<PerformanceRankingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceRankingFormComponent]
    });
    fixture = TestBed.createComponent(PerformanceRankingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
