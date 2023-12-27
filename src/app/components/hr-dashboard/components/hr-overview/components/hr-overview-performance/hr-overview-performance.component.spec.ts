import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOverviewPerformanceComponent } from './hr-overview-performance.component';

describe('HrOverviewPerformanceComponent', () => {
  let component: HrOverviewPerformanceComponent;
  let fixture: ComponentFixture<HrOverviewPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrOverviewPerformanceComponent]
    });
    fixture = TestBed.createComponent(HrOverviewPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
