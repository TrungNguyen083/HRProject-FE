import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOverviewStarEmployeesComponent } from './hr-overview-star-employees.component';

describe('HrOverviewStarEmployeesComponent', () => {
  let component: HrOverviewStarEmployeesComponent;
  let fixture: ComponentFixture<HrOverviewStarEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrOverviewStarEmployeesComponent]
    });
    fixture = TestBed.createComponent(HrOverviewStarEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
