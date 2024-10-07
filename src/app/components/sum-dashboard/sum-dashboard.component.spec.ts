import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumDashboardComponent } from './sum-dashboard.component';

describe('SumDashboardComponent', () => {
  let component: SumDashboardComponent;
  let fixture: ComponentFixture<SumDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumDashboardComponent]
    });
    fixture = TestBed.createComponent(SumDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
