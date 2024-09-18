import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyLevelFormComponent } from './proficiency-level-form.component';

describe('ProficiencyLevelFormComponent', () => {
  let component: ProficiencyLevelFormComponent;
  let fixture: ComponentFixture<ProficiencyLevelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProficiencyLevelFormComponent]
    });
    fixture = TestBed.createComponent(ProficiencyLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
