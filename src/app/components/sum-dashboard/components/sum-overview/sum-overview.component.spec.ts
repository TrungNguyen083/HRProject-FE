import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumOverviewComponent } from './sum-overview.component';

describe('SumOverviewComponent', () => {
  let component: SumOverviewComponent;
  let fixture: ComponentFixture<SumOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumOverviewComponent]
    });
    fixture = TestBed.createComponent(SumOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
