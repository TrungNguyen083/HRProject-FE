import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEvaluationOverviewComponent } from './hr-evaluation-overview.component';

describe('HrEvaluationOverviewComponent', () => {
  let component: HrEvaluationOverviewComponent;
  let fixture: ComponentFixture<HrEvaluationOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrEvaluationOverviewComponent]
    });
    fixture = TestBed.createComponent(HrEvaluationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
