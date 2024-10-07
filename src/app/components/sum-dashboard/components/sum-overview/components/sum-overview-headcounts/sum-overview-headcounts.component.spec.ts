import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumOverviewHeadcountsComponent } from './sum-overview-headcounts.component';

describe('SumOverviewHeadcountsComponent', () => {
  let component: SumOverviewHeadcountsComponent;
  let fixture: ComponentFixture<SumOverviewHeadcountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumOverviewHeadcountsComponent]
    });
    fixture = TestBed.createComponent(SumOverviewHeadcountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
