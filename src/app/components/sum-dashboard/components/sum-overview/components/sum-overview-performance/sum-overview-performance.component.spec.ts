import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumOverviewPerformanceComponent } from './sum-overview-performance.component';

describe('SumOverviewPerformanceComponent', () => {
  let component: SumOverviewPerformanceComponent;
  let fixture: ComponentFixture<SumOverviewPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumOverviewPerformanceComponent]
    });
    fixture = TestBed.createComponent(SumOverviewPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
