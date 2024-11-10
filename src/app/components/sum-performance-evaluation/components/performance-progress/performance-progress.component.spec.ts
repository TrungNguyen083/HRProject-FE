import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceProgressComponent } from './performance-progress.component';

describe('PerformanceProgressComponent', () => {
  let component: PerformanceProgressComponent;
  let fixture: ComponentFixture<PerformanceProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceProgressComponent]
    });
    fixture = TestBed.createComponent(PerformanceProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
