import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyProgressComponent } from './competency-progress.component';

describe('CompetencyProgressComponent', () => {
  let component: CompetencyProgressComponent;
  let fixture: ComponentFixture<CompetencyProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyProgressComponent]
    });
    fixture = TestBed.createComponent(CompetencyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
