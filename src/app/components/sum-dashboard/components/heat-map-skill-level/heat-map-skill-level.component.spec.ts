import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapSkillLevelComponent } from './heat-map-skill-level.component';

describe('HeatMapSkillLevelComponent', () => {
  let component: HeatMapSkillLevelComponent;
  let fixture: ComponentFixture<HeatMapSkillLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatMapSkillLevelComponent]
    });
    fixture = TestBed.createComponent(HeatMapSkillLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
