import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTimelineComponent } from './evaluation-timeline.component';

describe('EvaluationTimelineComponent', () => {
  let component: EvaluationTimelineComponent;
  let fixture: ComponentFixture<EvaluationTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationTimelineComponent]
    });
    fixture = TestBed.createComponent(EvaluationTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
