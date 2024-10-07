import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBoxPerformanceComponent } from './grid-box-performance.component';

describe('GridBoxPerformanceComponent', () => {
  let component: GridBoxPerformanceComponent;
  let fixture: ComponentFixture<GridBoxPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridBoxPerformanceComponent]
    });
    fixture = TestBed.createComponent(GridBoxPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
