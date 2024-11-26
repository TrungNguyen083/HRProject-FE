import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareGoalComponent } from './compare-goal.component';

describe('CompareGoalComponent', () => {
  let component: CompareGoalComponent;
  let fixture: ComponentFixture<CompareGoalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareGoalComponent]
    });
    fixture = TestBed.createComponent(CompareGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
