import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumOverviewStartsComponent } from './sum-overview-starts.component';

describe('SumOverviewStartsComponent', () => {
  let component: SumOverviewStartsComponent;
  let fixture: ComponentFixture<SumOverviewStartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumOverviewStartsComponent]
    });
    fixture = TestBed.createComponent(SumOverviewStartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
