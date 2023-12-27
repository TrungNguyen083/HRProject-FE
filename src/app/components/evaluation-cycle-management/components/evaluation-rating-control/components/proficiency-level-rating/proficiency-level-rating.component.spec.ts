import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyLevelRatingComponent } from './proficiency-level-rating.component';

describe('ProficiencyLevelRatingComponent', () => {
  let component: ProficiencyLevelRatingComponent;
  let fixture: ComponentFixture<ProficiencyLevelRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProficiencyLevelRatingComponent]
    });
    fixture = TestBed.createComponent(ProficiencyLevelRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
