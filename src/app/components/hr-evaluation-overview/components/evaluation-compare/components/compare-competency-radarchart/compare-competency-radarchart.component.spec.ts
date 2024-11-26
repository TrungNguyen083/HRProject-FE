import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCompetencyRadarchartComponent } from './compare-competency-radarchart.component';

describe('CompareCompetencyRadarchartComponent', () => {
  let component: CompareCompetencyRadarchartComponent;
  let fixture: ComponentFixture<CompareCompetencyRadarchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareCompetencyRadarchartComponent]
    });
    fixture = TestBed.createComponent(CompareCompetencyRadarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
