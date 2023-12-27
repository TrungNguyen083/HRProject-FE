import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOverviewCurrentHeadcountsComponent } from './hr-overview-current-headcounts.component';

describe('HrOverviewCurrentHeadcountsComponent', () => {
  let component: HrOverviewCurrentHeadcountsComponent;
  let fixture: ComponentFixture<HrOverviewCurrentHeadcountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrOverviewCurrentHeadcountsComponent]
    });
    fixture = TestBed.createComponent(HrOverviewCurrentHeadcountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
